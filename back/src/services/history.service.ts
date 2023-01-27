import { Op } from "sequelize";
import History from "../models/history.model";
import User from "../models/user.model";
import UsersHistory from "../models/userhistory.model";
import { ICreateHistoryPayload } from "../types/history";

export const createHistory = async (data: ICreateHistoryPayload) => {
  const history = await History.findOrCreate({
    where: {
      gameId: data.gameId
    },
    defaults: {
      steps: JSON.stringify(data.steps),
      winner: data.winner,
      gameId: data.gameId
    }
  });

  updateJunctionTable(history[0].toJSON().id, data.userId);

  return history[0].toJSON();
};

export const getAllHistory = async (id: string) => {
  const data = await User.findByPk(id, {
    include: {
      model: History,
      include: [
        {
          model: User,
          where: {
            id: {
              [Op.not]: id
            }
          }
        }
      ],
      through: {
        attributes: []
      }
    }
  });

  return data?.toJSON();
};

const updateJunctionTable = async (historyId: number, userId: number) => {
  await UsersHistory.create({
    historyId,
    userId
  });
};
