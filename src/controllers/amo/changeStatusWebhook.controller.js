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
  NEED_TO_CONTACT: 66250790,
  CALL: 65914674,
};

const sheetsIdsEnum = {
  SUCCESS: 488030001,
  NO_SUCCESS: 244560428,
  COLLECT_INFO: 61580715,
  CALL: 333399471,
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

    return rows[leadIdHeaderIndex] == filterValue;
  });
};

const onHandlerToSuccessStatus = async ({
  googleSpreadSheet,
  customFields,
  leadData,
  responsibleUser,
}) => {
  const { id, created_at } = leadData;

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
          googleSheetsData[obj.name] = id;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${id}`;
          break;
        case GSHeadersEnum.RESPONSIBLE_EMPLOYEE:
          googleSheetsData[obj.name] = responsibleUser;
          break;
        case GSHeadersEnum.CREATED_AT_LEAD:
          googleSheetsData[obj.name] = formatDateTimeUtil({
            display: [
              timeDisplayVariantsEnum.DATE,
              timeDisplayVariantsEnum.TIME,
            ],
            timestamp: created_at,
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

    console.log(`Первая заявка ${id} добавлена на лист ${targetSheet.title}`);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: id,
    });

    console.log(`Существующая запись: ${targetRows.length}`, `leadId: ${id}`);

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);

      console.log(`Заявка ${id} добавлена на лист ${targetSheet.title}`);
    }
  }

  return;
};

const onHandlerToNoSuccessStatus = async ({
  googleSpreadSheet,
  customFields,
  leadData,
  responsibleUser,
}) => {
  const { id } = leadData;

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
          googleSheetsData[obj.name] = id;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${id}`;
          break;
        case GSHeadersEnum.RESPONSIBLE_EMPLOYEE:
          googleSheetsData[obj.name] = responsibleUser;
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

    console.log(`Первая заявка ${id} добавлена на лист ${targetSheet.title}`);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: id,
    });

    console.log(`Существующая запись: ${targetRows.length}`, `leadId: ${id}`);

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);

      console.log(`Заявка ${id} добавлена на лист ${targetSheet.title}`);
    }
  }

  return;
};

const onHandlerToCollectInfoStatus = async ({
  googleSpreadSheet,
  customFields,
  leadData,
  responsibleUser,
}) => {
  const { id } = leadData;

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
          googleSheetsData[obj.name] = id;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${id}`;
          break;
        case GSHeadersEnum.RESPONSIBLE_EMPLOYEE:
          googleSheetsData[obj.name] = responsibleUser;
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

    console.log(`Первая заявка ${id} добавлена на лист ${targetSheet.title}`);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: id,
    });

    console.log(`Существующая запись: ${targetRows.length}`, `leadId: ${id}`);

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);

      console.log(`Заявка ${id} добавлена на лист ${targetSheet.title}`);
    }
  }

  return;
};

const onHandlerToCallStatus = async ({
  googleSpreadSheet,
  customFields,
  leadData,
  responsibleUser,
}) => {
  const { id, created_at } = leadData;

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
          googleSheetsData[obj.name] = id;
          break;
        case GSHeadersEnum.LEAD_LINK:
          googleSheetsData[
            obj.name
          ] = `https://${process.env.AMO_REFERER}/leads/detail/${id}`;
          break;
        case GSHeadersEnum.RESPONSIBLE_EMPLOYEE:
          googleSheetsData[obj.name] = responsibleUser;
          break;
        case GSHeadersEnum.CALL_AT:
          googleSheetsData[obj.name] = formatDateTimeUtil({
            display: [
              timeDisplayVariantsEnum.DATE,
              timeDisplayVariantsEnum.TIME,
            ],
          });
          break;
        case GSHeadersEnum.CREATED_AT_LEAD:
          googleSheetsData[obj.name] = formatDateTimeUtil({
            display: [
              timeDisplayVariantsEnum.DATE,
              timeDisplayVariantsEnum.TIME,
            ],
            timestamp: created_at,
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

  const targetSheet = googleSpreadSheet.sheetsById[sheetsIdsEnum.CALL];

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

    console.log(`Первая заявка ${id} добавлена на лист ${targetSheet.title}`);
  } else {
    const targetRows = findTargetRowsInTable({
      allRows: rows,
      filterValue: id,
    });

    console.log(`Существующая запись: ${targetRows.length}`, `leadId: ${id}`);

    if (!targetRows.length) {
      await targetSheet.addRow(googleSheetsData);

      console.log(`Заявка ${id} добавлена на лист ${targetSheet.title}`);
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

    const { data: userResponse } = await amoApiInstance.get(
      `/users/${leadResponse.responsible_user_id}`
    );

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
          leadData: leadResponse,
          googleSpreadSheet,
          customFields,
          responsibleUser: userResponse.name,
        });
        break;
      case leadStatusesIdsEnum.NO_SUCCESS:
        await onHandlerToNoSuccessStatus({
          leadData: leadResponse,
          googleSpreadSheet,
          customFields,
          responsibleUser: userResponse.name,
        });
        break;
      case leadStatusesIdsEnum.COLLECT_INFO:
        await onHandlerToCollectInfoStatus({
          leadData: leadResponse,
          googleSpreadSheet,
          customFields,
          responsibleUser: userResponse.name,
        });
        break;
      case leadStatusesIdsEnum.NEED_TO_CONTACT:
        await onHandlerToCollectInfoStatus({
          leadData: leadResponse,
          googleSpreadSheet,
          customFields,
          responsibleUser: userResponse.name,
        });
        break;
      case leadStatusesIdsEnum.CALL:
        await onHandlerToCallStatus({
          leadData: leadResponse,
          googleSpreadSheet,
          customFields,
          responsibleUser: userResponse.name,
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

// if (!rows.length) {
//   await targetSheet.addRow(googleSheetsData);
// } else {
//   const targetRows = findTargetRowsInTable({
//     allRows: rows,
//     filterValue: id,
//   });

//   if (!targetRows.length) {
//     await targetSheet.addRow(googleSheetsData);
//   } else {
//     targetRows[0].assign({
//       [GSHeadersEnum.CALL_AT]: formatDateTimeUtil({
//         display: [timeDisplayVariantsEnum.DATE, timeDisplayVariantsEnum.TIME],
//       }),
//     });
//     await targetRows[0].save();
//   }
// }
