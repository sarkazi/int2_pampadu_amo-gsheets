const { Router } = require("express");

const router = Router();

const SuccessStageWebhookController = require("../controllers/amo/successStageWebhook.controller.js");
const CallStageWebhookController = require("../controllers/amo/callStageWebhook.controller.js");
const CollectInfoStageWebhookController = require("../controllers/amo/collectInfoStageWebhook.controller.js");
const NoSuccessStageWebhookController = require("../controllers/amo/noSuccessStageWebhook.controller.js");

router.post("/webhook/offline-mortgage/success", SuccessStageWebhookController);
router.post("/webhook/offline-mortgage/call", CallStageWebhookController);
router.post(
  "/webhook/offline-mortgage/no-success",
  NoSuccessStageWebhookController
);
router.post(
  "/webhook/offline-mortgage/collect-info",
  CollectInfoStageWebhookController
);

module.exports = router;
