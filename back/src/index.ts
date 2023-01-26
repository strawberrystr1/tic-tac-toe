import express, { Request } from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import bodyParser from "body-parser";
import router from "./routes/index";
import dbClient from "./db";
import createSocketHandlers from "./createSocketHandlers";
import User from "./models/user.model";
import History from "./models/history.model";
import UsersHistory from "./models/userhistory.model";

const runServer = async () => {
  const app = express();

  app.use(cors({ origin: "*" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.json());

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  app.set("io", io);
  app.use(router);

  const searchRoomUsers = new Set<number>();
  const games = {};

  io.on("connection", socket => {
    createSocketHandlers(socket, searchRoomUsers, games);
  });

  const port = process.env.PORT || 4000;

  try {
    User.belongsToMany(History, { through: UsersHistory });
    History.belongsToMany(User, { through: UsersHistory });

    await dbClient.authenticate();
    await dbClient.sync({ alter: true });

    server.listen(port, undefined, () => console.log("server is up at", port));
  } catch (e) {
    console.log(e);
  }
};

runServer();
