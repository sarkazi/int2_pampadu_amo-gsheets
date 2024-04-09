const { Router } = require("express");

const router = Router();

const WebhookController = require("../controllers/amo/webhook.controller.js");

router.post("/webhook", WebhookController);

module.exports = router;
