import { Sequelize } from "sequelize";

const dbClient = new Sequelize(
  process.env.PGDATABASE as string,
  process.env.PGUSER as string,
  process.env.PGPASSWORD as string,
  {
    host: process.env.PGHOST,
    port: +(process.env.PGPORT as string),
    dialect: "postgres",
    logging: false
  }
);

export default dbClient;
