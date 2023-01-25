import { Op } from "sequelize";
import User from "../models/user.model";

export const loginUser = async (name: string) => {
  let user = await User.findOne({ where: { name } });

  if (!user) {
    user = await createUser(name);
  }

  return user.toJSON();
};

export const createUser = async (name: string) => {
  const user = await User.create({ name }, { returning: true });

  return user;
};

export const getAllUsers = async (except: string | undefined) => {
  const users = await User.findAll({
    where: {
      id: {
        [Op.not]: except ? +except : 0
      }
    }
  });

  return users.map(e => e.toJSON());
};

export const getUsersById = async (ids: number[]) => {
  const users = await User.findAll({ where: { id: ids } });

  return users.map(e => e.toJSON());
};
