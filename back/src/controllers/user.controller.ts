import { Request, Response } from "express";
import {
  getAllUsers,
  getUsersById,
  loginUser,
  updateUserRating
} from "../services/user.service";
import { HTTPCodes } from "../types/types";
import { IUpdateRatingPayload } from "../types/user";

export const loginUserController = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      res.status(HTTPCodes.BAD_REQUEST).send({
        msg: "User name was not provided"
      });
    }

    const user = await loginUser(name);

    res.send(JSON.stringify(user));
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .send(JSON.stringify({ msg: "Something went wrong while login" }));
  }
};

export const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const except = req.query.except as string | undefined;

    const users = await getAllUsers(except);

    res.json(users);
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .json({ msg: "Server can't handle request now" });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(HTTPCodes.BAD_REQUEST).send({
        msg: "User ID was not provided"
      });
      return;
    }

    const user = await getUsersById([+id]);

    res.json(user);
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .json({ msg: "Server can't handle request now" });
  }
};

export const updateRatingController = async (
  req: Request<{}, {}, IUpdateRatingPayload>,
  res: Response
) => {
  try {
    const { id, rating } = req.body;

    if (!id || !rating) {
      res.status(HTTPCodes.BAD_REQUEST).send({
        msg: "User data was not provided"
      });
      return;
    }

    const updated = await updateUserRating(id, rating);

    res.json(updated);
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .json({ msg: "Server can't handle request now" });
  }
};
