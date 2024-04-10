const axios = require("axios");
const { successStageData } = require("../../const/GSSendData.js");
const GSHeadersEnum = require("../../const/GSHeadersEnum.js");
const amoApiInstance = require("../../api/amo.instance.js");
const {
  onDefineValueForGS,
} = require("../../utils/googleSheets/onDefineValueForGS.js");

module.exports = async (req, res, next) => {
  try {
    const { leads } = req.body;

    const leadId = leads.status[0].id;

    console.log(`Сделка ${leadId} на этапе "Успешно реализовано"`);

    const { data: leadResponse } = await amoApiInstance.get(`/leads/${leadId}`);

    const customFields = leadResponse.custom_fields_values
      ? leadResponse.custom_fields_values
      : [];

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

    const { data } = await axios.post(
      process.env.GOOGLE_MACROS_SUCCESS_STAGE_LINK,
      googleSheetsData
    );

    console.log(data, "fgiuudkjf");

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
