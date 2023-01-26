import { Request, Response } from "express";

import { createHistory, getAllHistory } from "../services/history.service";
import { ICreateHistoryPayload } from "../types/history";
import { HTTPCodes } from "../types/types";

export const createHistoryController = async (
  req: Request<{}, {}, ICreateHistoryPayload>,
  res: Response
) => {
  try {
    const data = req.body;

    if (!data) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: "No history data" });
      return;
    }

    const history = await createHistory(data);

    res.json({ msg: "History created", data: history });
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .json({ msg: "Server can't save your history", error: e });
  }
};

export const getHistoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      res
        .status(HTTPCodes.BAD_REQUEST)
        .json({ msg: "User id was not provided" });
    }

    const data = await getAllHistory(id as string);

    res.json(data);
  } catch (e) {
    res
      .status(HTTPCodes.INTERNAL_ERROR)
      .json({ msg: "Server can't save your history", error: e });
  }
};
