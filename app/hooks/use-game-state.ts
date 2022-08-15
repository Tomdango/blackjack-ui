import type { Reducer } from "react";
import { useReducer } from "react";
import { gameStatus } from "~/lib/constants";
import type { GameAction, GameState } from "~/lib/types";

const gameStateReducer: Reducer<GameState, GameAction> = (state, action) => {
  switch (action.type) {
    case "GAME::RESET":
      return { ...initialState };

    case "GAME::PLAYER_BUSTED":
      return {
        ...state,
        playerBusted: true,
        playerCanHitOrStand: false,
      };

    case "GAME::SET_STATUS":
      return {
        ...state,
        status: action.status,
        playerCanHitOrStand:
          action.playerCanHitOrStand ?? state.playerCanHitOrStand,
      };
  }
};

const initialState: GameState = {
  status: gameStatus.NOT_STARTED,
  isDealing: true,
  playerBusted: false,
  playerCanHitOrStand: false,
};

const useGameState = () => useReducer(gameStateReducer, initialState);

export default useGameState;
