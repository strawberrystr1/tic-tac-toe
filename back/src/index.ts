import express, { Request } from "express";
import { Server } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import bodyParser from "body-parser";
import router from "./routes/index";
import dbClient from "./db";
import { createSocketHandlers } from "./createSocketHandlers";

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

  io.on("connection", socket => {
    console.log("user connected", socket.id);
    createSocketHandlers(socket);
  });

  const port = process.env.PORT || 4000;

  try {
    await dbClient.authenticate();
    await dbClient.sync({ alter: true });

    server.listen(port, undefined, () => console.log("server is up at", port));
  } catch (e) {
    console.log(e);
  }
};

runServer();
