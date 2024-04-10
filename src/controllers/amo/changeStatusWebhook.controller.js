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

const leadStatusesIdsEnum = {
  SUCCESS: 142,
  NO_SUCCESS: 143,
  COLLECT_INFO: 60679026,
  CALL: 65914674,
};

const onDefineGoogleScriptsUrl = ({ statusId }) => {
  switch (statusId) {
    case leadStatusesIdsEnum.SUCCESS:
      return process.env.GOOGLE_MACROS_SUCCESS_STAGE_LINK;
    case leadStatusesIdsEnum.NO_SUCCESS:
      return process.env.GOOGLE_MACROS_NO_SUCCESS_STAGE_LINK;
    case leadStatusesIdsEnum.CALL:
      return process.env.GOOGLE_MACROS_CALL_STAGE_LINK;
    case leadStatusesIdsEnum.COLLECT_INFO:
      return process.env.GOOGLE_MACROS_COLLECT_INFO_STAGE_LINK;
    default:
      return "";
  }
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

    const googleSheetsData = {};

    switch (statusId) {
      case leadStatusesIdsEnum.SUCCESS:
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
        break;
      case leadStatusesIdsEnum.NO_SUCCESS:
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
        break;
      case leadStatusesIdsEnum.COLLECT_INFO:
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
        break;
      case leadStatusesIdsEnum.CALL:
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
                googleSheetsData[obj.name] = Math.floor(
                  new Date().getTime() / 1000
                );
                break;
              default:
                googleSheetsData[obj.name] = "";
                break;
            }
          }
        });
        break;
      default:
        return res.status(200).json({
          status: "success",
        });
    }

    const googleScriptsUrl = onDefineGoogleScriptsUrl({ statusId });

    const { data: googleScriptResponse } = await axios.post(
      googleScriptsUrl,
      googleSheetsData
    );

    console.log(googleScriptResponse);

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
