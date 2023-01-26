import { Router } from "express";
import { createHistoryController, getHistoryController } from "../controllers/history.controller";

const router = Router();

router.post('/', createHistoryController);
router.get('/', getHistoryController);

export default router;