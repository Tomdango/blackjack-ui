import type { gameStatus, ranks, suits } from "./constants";

export interface ICard {
  shown: boolean;
  suit: typeof suits[number];
  rank: typeof ranks[number];
}

export interface CardValue {
  high: number;
  low: number;
}

export type GameStatus = typeof gameStatus[keyof typeof gameStatus];
export type GameState = {
  status: GameStatus;
  isDealing: boolean;
  playerBusted: boolean;
  playerCanHitOrStand: boolean;
};

type PlayerBustedAction = { type: "GAME::PLAYER_BUSTED" };
type ResetAction = { type: "GAME::RESET" };
type SetStatusAction = {
  type: "GAME::SET_STATUS";
  status: GameState["status"];
  playerCanHitOrStand?: boolean;
};

export type GameAction = ResetAction | PlayerBustedAction | SetStatusAction;
