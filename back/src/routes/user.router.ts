import { Router } from "express";
import {
  getUserByIdController,
  handleGetAllUsers,
  loginUserController
} from "../controllers/user.controller";

const router = Router();

router.post("/login", loginUserController);
router.get("/:id", getUserByIdController);
router.get("/", handleGetAllUsers);

export default router;
