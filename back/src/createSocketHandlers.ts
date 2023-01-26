import { Socket } from "socket.io";
import { getUsersById } from "./services/user.service";
import { GameEvents, IGameItem, SearchEvents } from "./types/socket";
import { IConnectToSearchRoomData } from "./types/types";

const createSearchSocketHandlers = (
  socket: Socket,
  searchRoomUsers: Set<number>
) => {
  socket.on(SearchEvents.SEARCH, async data => {
    const parsed = JSON.parse(data) as IConnectToSearchRoomData;

    if (searchRoomUsers.has(parsed.user.id)) {
      searchRoomUsers.delete(parsed.user.id);
    }

    const users = await getUsersById(Array.from(searchRoomUsers));

    searchRoomUsers.add(parsed.user.id);
    socket.join(SearchEvents.SEARCH_ROOM);

    socket.emit(SearchEvents.JOIN_TO_SEARCH, JSON.stringify(users));
    socket.to(SearchEvents.SEARCH_ROOM).emit(SearchEvents.NEW_USER, data);
  });

  socket.on(SearchEvents.LEAVE_SEARCH, data => {
    searchRoomUsers.delete(+data);
    socket.to(SearchEvents.SEARCH_ROOM).emit(SearchEvents.LEAVE_SEARCH, data);
  });

  socket.on(SearchEvents.NOTIFY_ENEMY, data => {
    socket.to(SearchEvents.SEARCH_ROOM).emit(SearchEvents.NOTIFY_ENEMY, data);
  });

  socket.on(SearchEvents.DECLINE_MATCH, data => {
    socket.to(SearchEvents.SEARCH_ROOM).emit(SearchEvents.DECLINE_MATCH, data);
  });

  socket.on(SearchEvents.ACCEPT_MATCH, data => {
    socket.to(SearchEvents.SEARCH_ROOM).emit(SearchEvents.ACCEPT_MATCH, data);
  });
};

const createGameSocketHandlers = (
  socket: Socket,
  games: Record<string, IGameItem>
) => {
  socket.on(GameEvents.USER_CONNECT, data => {
    const { user, game } = JSON.parse(data);

    socket.join(game);

    const isGameExist = games[game];

    if (isGameExist) {
      games[game].users = games[game].users + 1;

      socket.to(game).emit(GameEvents.GAME_START);
      socket.emit(GameEvents.GAME_START);
      socket.emit(
        GameEvents.SET_ICON,
        JSON.stringify({
          icon: games[game].secondIcon,
          isFirst: games[game].secondIcon === 1
        })
      );
    } else {
      games[game] = {
        users: 1,
        firstIcon: 0,
        secondIcon: 0,
        winner: 0
      };

      const icon = Math.random() > 0.5 ? 1 : 2;
      games[game].firstIcon = icon;
      games[game].secondIcon = icon === 1 ? 2 : 1;

      socket.emit(
        GameEvents.SET_ICON,
        JSON.stringify({
          icon: games[game].firstIcon,
          isFirst: games[game].firstIcon === 1
        })
      );
    }
  });

  socket.on(GameEvents.USER_MOVE, data => {
    const { moveIndex, gameId, user, icon } = JSON.parse(data);
    socket
      .to(gameId)
      .emit("user move", JSON.stringify({ icon, moveIndex, user }));
  });

  socket.on(GameEvents.END_GAME, data => {
    const { winner, userId, gameId } = JSON.parse(data);

    if (typeof winner === "boolean") {
      games[gameId].winner = userId;
    } else {
      games[gameId].winner = -1;
    }

    socket.to(gameId).emit(GameEvents.END_GAME, games[gameId].winner);
  });
};

const createSocketHandlers = (
  socket: Socket,
  searchRoomUsers: Set<number>,
  games: Record<string, IGameItem>
) => {
  createSearchSocketHandlers(socket, searchRoomUsers);
  createGameSocketHandlers(socket, games);
};

export default createSocketHandlers;
