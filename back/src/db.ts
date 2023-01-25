import { Sequelize } from "sequelize";

const dbClient = new Sequelize("tic-tac-toe", "postgres", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false
});

export default dbClient;