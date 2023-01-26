import { DataTypes, Model } from "sequelize";

import dbClient from "../db";
import { IHistory, IHistoryCreate } from "../types/history";

const History = dbClient.define<Model<IHistory, IHistoryCreate>>(
  "history",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    steps: DataTypes.TEXT,
    winner: DataTypes.INTEGER,
    gameId: {
      type: DataTypes.TEXT,
      unique: true
    }
  },
  { freezeTableName: true, timestamps: false }
);

export default History;
