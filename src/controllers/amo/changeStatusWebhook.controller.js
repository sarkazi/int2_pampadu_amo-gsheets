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
const getCurrentDateTime = require("../../utils/getCurrentDateTime.js");

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
  CALL: "Успешно",
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
  });

  const targetSheet = googleSpreadSheet.sheetsByTitle[sheetsNameEnum.SUCCESS];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows({
    query: `${GSHeadersEnum.LEAD_ID} = ${leadId}`,
  });

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
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
  });

  const targetSheet =
    googleSpreadSheet.sheetsByTitle[sheetsNameEnum.NO_SUCCESS];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows({
    query: `${GSHeadersEnum.LEAD_ID} = ${leadId}`,
  });

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
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
  });

  const targetSheet =
    googleSpreadSheet.sheetsByTitle[sheetsNameEnum.COLLECT_INFO];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows({
    query: `${GSHeadersEnum.LEAD_ID} = ${leadId}`,
  });

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
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
          // googleSheetsData[obj.name] = Math.floor(new Date().getTime() / 1000);
          googleSheetsData[obj.name] = getCurrentDateTime();
          break;
        default:
          googleSheetsData[obj.name] = "";
          break;
      }
    }
  });

  const targetSheet = googleSpreadSheet.sheetsByTitle[sheetsNameEnum.CALL];

  const { headersArePresent } = await onCheckPresenceHeadingsInSheet({
    sheet: targetSheet,
  });

  if (!headersArePresent) {
    const headers = Object.keys(googleSheetsData);

    await targetSheet.setHeaderRow(headers);
  }

  const rows = await targetSheet.getRows({
    query: `${GSHeadersEnum.LEAD_ID} = ${leadId}`,
  });

  if (!rows.length) {
    await targetSheet.addRow(googleSheetsData);
  } else {
    rows[0].assign({ [GSHeadersEnum.CALL_AT]: getCurrentDateTime() });
    await rows[0].save();
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