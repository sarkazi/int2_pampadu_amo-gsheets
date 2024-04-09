import googleSheetsService from "../../services/google-sheets.service";
import amoService from "../../services/amo.service";

import recordedLeads from "../../state/recordedLeads";
import moment from "moment";

import { Response, Request, NextFunction } from "express";
import { ContactValue, IGetSheetResponse } from "../../services/types";

const amoWebhookController = async (req, res, next) => {
  try {
    const body = req.body;

    const isNoticeOfAddingDeal =
      body.hasOwnProperty("leads") && body.leads.hasOwnProperty("add");

    if (isNoticeOfAddingDeal && !recordedLeads.includes(body.leads.add[0].id)) {
      const dealInfo = body.leads.add[0];

      const responsibleUserData = await amoService.getUser(
        dealInfo.responsible_user_id
      );

      const leadData = await amoService.getLead(dealInfo.id);

      const { contact } = await onDefineContactData(
        leadData._embedded.contacts
      );

      const googleAccessToken =
        await googleSheetsService.getGoogleAccessToken();

      const newSheetRecordData = [
        dealInfo.id,
        moment(+dealInfo.created_at * 1000).format("D MMM YYYY, HH:mm"),
        contact.hasOwnProperty("phone") ? contact.phone : "-",
        contact.hasOwnProperty("name") ? contact.name : "-",
        responsibleUserData.name,
        responsibleUserData.id,
      ];

      const getSheetResponse = await googleSheetsService.getSheetData(
        googleAccessToken
      );

      const range = onDefineRange(getSheetResponse);

      await googleSheetsService.updateSheetData(
        [newSheetRecordData],
        googleAccessToken,
        range
      );

      recordedLeads.push(dealInfo.id);
    }

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

export default amoWebhookController;
