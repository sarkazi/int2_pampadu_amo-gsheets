const { Router } = require("express");

const router = Router();

const changeStatusWebhookController = require("../controllers/amo/changeStatusWebhook.controller.js");

router.post(
  "/webhook/offline-mortgage/change-status",
  changeStatusWebhookController
);

module.exports = router;
