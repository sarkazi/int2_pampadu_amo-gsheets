import { Router } from "express";

const router = Router();

import WebhookController from "../controllers/amo/webhook.controller";

router.post("/webhook", WebhookController);

export default router;
