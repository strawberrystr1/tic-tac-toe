import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { IUser, IUserCreation } from "../types/user";

const User = dbClient.define<Model<IUser, IUserCreation>>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

export default User;
