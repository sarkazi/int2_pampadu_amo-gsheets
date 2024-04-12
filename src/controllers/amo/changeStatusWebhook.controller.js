const axios = require("axios");
const {
  collectInfoData,
  callStageData,
  successStageData,
  noSuccessStageData,
} = require("../../const/GSSendData.js");
const GSHeadersEnum = require("../../const/GSHeadersEnum.js");
const amoApiInstance = require("../../api/amo.instance.js");
const {
  onDefineValueForGS,
} = require("../../utils/googleSheets/onDefineValueForGS.js");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const googleAuth = require("../../auth/google.auth.js");

const {
  timeDisplayVariantsEnum,
  formatDateTimeUtil,
} = require("../../utils/formatDateTimeUtil.js");

const leadStatusesIdsEnum = {
  SUCCESS: 142,
  NO_SUCCESS: 143,
  COLLECT_INFO: 60679026,
  CALL: 65914674,
};

const sheetsNameEnum = {
  SUCCESS: "Успешно",
  NO_SUCCESS: "Неуспешные",
  COLLECT_INFO: "Сбор инфы",
};
const sheetsIdsEnum = {
  SUCCESS: 488030001,
  NO_SUCCESS: 244560428,
  COLLECT_INFO: 61580715,
};

const onCheckPresenceHeadingsInSheet = async ({ sheet }) => {
  return await new Promise(async (resolve, _) => {
    try {
      await sheet.loadHeaderRow();
      resolve({
        headersArePresent: true,
      });
    } catch (err) {
      resolve({
        headersArePresent: false,
      });
    }
  });
};

const findTargetRowsInTable = ({ allRows, filterValue }) => {
  return allRows.filter((row) => {
    const headers = row._worksheet._headerValues;
    const rows = row._rawData;

    const leadIdHeaderIndex = headers.indexOf(GSHeadersEnum.LEAD_ID);

    return rows[leadIdHeaderIndex] === filterValue;
  });
};

const onHandlerToSuccessStatus = async ({
  googleSpreadSheet,
  customFields,
  leadId,
}) => {
  const googleSheetsData = {};

  successStageData.map((obj) => {
    if (obj.hasOwnProperty("customFieldId")) {
      googleSheetsData[obj.name] = onDefineValueForGS({
        customFields,
        customFieldId: obj.customFieldId,
      });
    } else {
      switch (obj.name) {
        case GSHeadersEnum.LEAD_ID:
          googleSheetsData[obj.name] = leadId;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${leadId}`;
          break;
        default:
          googleSheetsData[obj.name] = "";
          break;
      }
    }

    if (obj.hasOwnProperty("convertTime")) {
      googleSheetsData[obj.name] = formatDateTimeUtil({
        timestamp: +googleSheetsData[obj.name],
        display: [timeDisplayVariantsEnum.DATE],
      });
    }
  });

  const targetSheet = googleSpreadSheet.sheetsById[sheetsIdsEnum.SUCCESS];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows();

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: leadId,
    });

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);
    }
  }

  return;
};

const onHandlerToNoSuccessStatus = async ({
  googleSpreadSheet,
  customFields,
  leadId,
}) => {
  const googleSheetsData = {};

  noSuccessStageData.map((obj) => {
    if (obj.hasOwnProperty("customFieldId")) {
      googleSheetsData[obj.name] = onDefineValueForGS({
        customFields,
        customFieldId: obj.customFieldId,
      });
    } else {
      switch (obj.name) {
        case GSHeadersEnum.LEAD_ID:
          googleSheetsData[obj.name] = leadId;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${leadId}`;
          break;
        default:
          googleSheetsData[obj.name] = "";
          break;
      }
    }

    if (obj.hasOwnProperty("convertTime")) {
      googleSheetsData[obj.name] = formatDateTimeUtil({
        timestamp: +googleSheetsData[obj.name],
        display: [timeDisplayVariantsEnum.DATE],
      });
    }
  });

  const targetSheet = googleSpreadSheet.sheetsById[sheetsIdsEnum.NO_SUCCESS];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows();

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: leadId,
    });

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);
    }
  }

  return;
};

const onHandlerToCollectInfoStatus = async ({
  googleSpreadSheet,
  customFields,
  leadId,
}) => {
  const googleSheetsData = {};

  collectInfoData.map((obj) => {
    if (obj.hasOwnProperty("customFieldId")) {
      googleSheetsData[obj.name] = onDefineValueForGS({
        customFields,
        customFieldId: obj.customFieldId,
      });
    } else {
      switch (obj.name) {
        case GSHeadersEnum.LEAD_ID:
          googleSheetsData[obj.name] = leadId;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${leadId}`;
          break;
        default:
          googleSheetsData[obj.name] = "";
          break;
      }
    }

    if (obj.hasOwnProperty("convertTime")) {
      googleSheetsData[obj.name] = formatDateTimeUtil({
        timestamp: +googleSheetsData[obj.name],
        display: [timeDisplayVariantsEnum.DATE],
      });
    }
  });

  const targetSheet = googleSpreadSheet.sheetsById[sheetsIdsEnum.COLLECT_INFO];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows();

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: leadId,
    });

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);
    }
  }

  return;
};

const onHandlerToCallStatus = async ({
  googleSpreadSheet,
  customFields,
  leadId,
}) => {
  const googleSheetsData = {};

  callStageData.map((obj) => {
    if (obj.hasOwnProperty("customFieldId")) {
      googleSheetsData[obj.name] = onDefineValueForGS({
        customFields,
        customFieldId: obj.customFieldId,
      });
    } else {
      switch (obj.name) {
        case GSHeadersEnum.LEAD_ID:
          googleSheetsData[obj.name] = leadId;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${leadId}`;
          break;
        case GSHeadersEnum.CALL_AT:
          googleSheetsData[obj.name] = formatDateTimeUtil({
            display: [
              timeDisplayVariantsEnum.DATE,
              timeDisplayVariantsEnum.TIME,
              timeDisplayVariantsEnum.GMT,
            ],
          });
          break;
        default:
          googleSheetsData[obj.name] = "";
          break;
      }
    }

    if (obj.hasOwnProperty("convertTime")) {
      googleSheetsData[obj.name] = formatDateTimeUtil({
        timestamp: +googleSheetsData[obj.name],
        display: [timeDisplayVariantsEnum.DATE],
      });
    }
  });

  const targetSheet = googleSpreadSheet.sheetsById[sheetsIdsEnum.SUCCESS];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows();

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: leadId,
    });

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);
    } else {
      targetRows[0].assign({
        [GSHeadersEnum.CALL_AT]: formatDateTimeUtil({
          display: [
            timeDisplayVariantsEnum.DATE,
            timeDisplayVariantsEnum.TIME,
            timeDisplayVariantsEnum.GMT,
          ],
        }),
      });
      await targetRows[0].save();
    }
  }

  return;
};

module.exports = async (req, res, next) => {
  try {
    const { leads } = req.body;

    const leadId = leads.status[0].id;

    const statusId = +leads.status[0].status_id;

    console.log(`Сделка ${leadId} на этапе ${statusId}`);

    const { data: leadResponse } = await amoApiInstance.get(`/leads/${leadId}`);

    const customFields = leadResponse.custom_fields_values
      ? leadResponse.custom_fields_values
      : [];

    const googleSpreadSheet = new GoogleSpreadsheet(
      process.env.GOOGLE_SPREADSHEET_ID,
      googleAuth
    );

    await googleSpreadSheet.loadInfo();

    switch (statusId) {
      case leadStatusesIdsEnum.SUCCESS:
        await onHandlerToSuccessStatus({
          leadId,
          googleSpreadSheet,
          customFields,
        });
        break;
      case leadStatusesIdsEnum.NO_SUCCESS:
        await onHandlerToNoSuccessStatus({
          leadId,
          googleSpreadSheet,
          customFields,
        });
        break;
      case leadStatusesIdsEnum.COLLECT_INFO:
        await onHandlerToCollectInfoStatus({
          leadId,
          googleSpreadSheet,
          customFields,
        });
        break;
      case leadStatusesIdsEnum.CALL:
        await onHandlerToCallStatus({
          leadId,
          googleSpreadSheet,
          customFields,
        });
        break;
      default:
        return res.status(200).json({
          status: "success",
        });
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
    });
  }
};
