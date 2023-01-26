export enum SearchEvents {
  SEARCH = "search",
  SEARCH_ROOM = "search room",
  JOIN_TO_SEARCH = "join to search",
  NEW_USER = "new user",
  LEAVE_SEARCH = "leave search",
  NOTIFY_ENEMY = "notify enemy",
  DECLINE_MATCH = "decline match",
  ACCEPT_MATCH = "accept game"
}

export enum GameEvents {
  USER_CONNECT = "user join",
  GAME_START = "game start",
  USER_MOVE = "user move",
  SET_ICON = "set icon",
  END_GAME = "end game"
}

export interface IGameItem {
  users: number;
  firstIcon: number;
  secondIcon: number;
  winner: number;
}
