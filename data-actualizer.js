require("dotenv").config();

const Bull = require("bull");
const googleAuth = require("./src/auth/google.auth");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const amoApiInstance = require("./src/api/amo.instance");

const sheetId = "244560428";
const targetColumnHeader = "id_lead";
const npsColumnHeader = "nps";

const rateLimiterQueue = new Bull("rateLimiterQueue", {
  limiter: {
    max: 7,
    duration: 1000,
  },
  redis: {
    host: "localhost",
    port: 6380,
  },
});

let dealUpdates = [];

async function getDealsFromSheet() {
  const googleSpreadSheet = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET_ID,
    googleAuth
  );

  await googleSpreadSheet.loadInfo();

  const sheet = googleSpreadSheet.sheetsById[sheetId];
  if (!sheet) {
    console.error("Sheet not found.");
    return [];
  }

  const rows = await sheet.getRows();

  const headers = sheet.headerValues;

  const targetColumnIndex = headers.indexOf(targetColumnHeader);

  if (targetColumnIndex === -1) {
    console.error("Target column not found.");
    return [];
  }

  const deals = rows.map((row, index) => {
    return {
      id: +row._rawData[targetColumnIndex],
      rowIndex: index + 2,
      headers,
    };
  });

  return deals.reverse();
}

async function checkCustomField(dealId) {
  try {
    const response = await amoApiInstance.get(`/leads/${dealId}`);

    if (!response) {
      console.log("сделка не найдена", dealId);
      return;
    }

    const deal = response.data;

    if (!deal.custom_fields_values || !deal.custom_fields_values.length) {
      console.log("кастом филдс отсутствуют", dealId);
      return;
    }

    const customField = deal.custom_fields_values.find(
      (field) => field.field_id === 774937
    );

    if (!customField) {
      console.log("кастом филд отсутствует", dealId);
      return;
    }

    return customField;
  } catch (error) {
    console.error(`Error fetching deal with ID ${dealId}:`, error);
  }
}

function getColumnLetter(index) {
  let letter = "";
  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}

async function updateNpsInSheet(deal, nps) {
  try {
    const googleSpreadSheet = new GoogleSpreadsheet(
      process.env.GOOGLE_SPREADSHEET_ID,
      googleAuth
    );

    await googleSpreadSheet.loadInfo();

    const sheet = googleSpreadSheet.sheetsById[sheetId];

    if (!sheet) {
      console.error("Sheet not found.");
      return;
    }

    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    const npsColumnIndex = headers.indexOf(npsColumnHeader);

    if (npsColumnIndex === -1) {
      console.error("NPS column not found.");
      return;
    }

    const cellRanges = dealUpdates.map((deal) => {
      const columnLetter = getColumnLetter(npsColumnIndex);
      return `${columnLetter}${deal.rowIndex}:${columnLetter}${deal.rowIndex}`;
    });
    await sheet.loadCells(cellRanges);

    dealUpdates.forEach((deal) => {
      const columnLetter = getColumnLetter(deal.npsColumnIndex);
      const cellA1 = `${columnLetter}${deal.rowIndex}`;
      const cell = sheet.getCellByA1(cellA1);
      cell.value = deal.nps;
    });

    await sheet.saveUpdatedCells();

    console.log("Updated NPS for deals.");
  } catch (error) {
    console.error(
      `Ошибка при обновлении значения в таблице`,
      deal.id,
      error?.response?.data?.error ? error.response.data.error : null
    );
  }
}

async function main() {
  const deals = await getDealsFromSheet();

  await Promise.all(
    deals.map(async (deal) => {
      return await rateLimiterQueue.add(deal);
    })
  );
}

rateLimiterQueue.process(async (job) => {
  const deal = job.data;
  const result = await checkCustomField(deal.id);

  if (result) {
    console.log("кастом филд найден", result.values[0], job.data.id);
    const npsColumnIndex = deal.headers.indexOf(npsColumnHeader);
    const nps = +result.values[0].value;

    dealUpdates.push({
      ...deal,
      nps,
      npsColumnIndex,
    });
  }
});

rateLimiterQueue.on("drained", async () => {
  console.log("All jobs have been processed. Updating Google Sheets...");

  if (dealUpdates.length) {
    await updateNpsInSheet(dealUpdates);
  }
});

main().catch((error) => {
  console.error("Error in main function:", error);
});
