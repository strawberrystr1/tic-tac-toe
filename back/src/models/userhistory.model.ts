import { DataTypes } from "sequelize";

import dbClient from "../db";

const UsersHistory = dbClient.define(
  "users_history",
  {},
  { freezeTableName: true, timestamps: false }
);

export default UsersHistory;
