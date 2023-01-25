import { Socket } from "socket.io";
import { getUsersById } from "./services/user.service";
import { IConnectToSearchRoomData } from "./types/types";

export const createSocketHandlers = (socket: Socket) => {
  const usersInSearch: number[] = [];
  socket.on("search", async data => {
    const parsed = JSON.parse(data) as IConnectToSearchRoomData;

    const users = await getUsersById(usersInSearch);

    usersInSearch.push(parsed.user.id);
    socket.join("search game");

    socket.emit("join to search", JSON.stringify(users));
    socket.to("search game").emit("new user", data);
  });
};
