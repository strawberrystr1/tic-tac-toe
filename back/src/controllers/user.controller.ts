import { Request, Response } from "express";
import { getAllUsers, getUsersById, loginUser } from "../services/user.service";
import { HTTPCodes } from "../types/types";

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
