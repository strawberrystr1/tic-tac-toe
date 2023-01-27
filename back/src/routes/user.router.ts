import { Router } from "express";
import {
  getUserByIdController,
  handleGetAllUsers,
  loginUserController,
  updateRatingController
} from "../controllers/user.controller";

const router = Router();

router.post("/login", loginUserController);
router.post("/rating", updateRatingController);
router.get("/:id", getUserByIdController);
router.get("/", handleGetAllUsers);

export default router;
