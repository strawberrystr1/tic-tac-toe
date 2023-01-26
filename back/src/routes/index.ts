import { Router } from "express";

import userRouter from "./user.router";
import historyRouter from "./history.router";

const router = Router();

router.use("/user", userRouter);
router.use("/history", historyRouter);

export default router;
