import { useEffect } from "react";
import { gameStatus } from "~/lib/constants";
import { calculateHandValue } from "~/lib/utils";
import useDeck from "./use-deck";
import useGameState from "./use-game-state";
import useHand from "./use-hand";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const useGame = () => {
  const [state, dispatch] = useGameState();

  const deck = useDeck();
  const playerHand = useHand();
  const dealerHand = useHand();

  useEffect(() => {
    if (playerHand.isBusted) {
      dispatch({ type: "GAME::PLAYER_BUSTED" });
      dispatch({ type: "GAME::SET_STATUS", status: gameStatus.BUSTED });
      dealerHand.showAllCards();
    }
    // Dispatch is the update function of the useReducer hook and does not change, so is safe to omit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerHand.isBusted, dealerHand]);

  const start = async () => {
    dispatch({ type: "GAME::RESET" });
    dispatch({
      type: "GAME::SET_STATUS",
      status: gameStatus.DEALING_CARDS,
    });

    deck.reset();
    playerHand.reset();
    dealerHand.reset();

    playerHand.addCard(await deck.deal());
    await sleep(500);

    dealerHand.addCard(await deck.deal());
    await sleep(500);

    playerHand.addCard(await deck.deal());
    await sleep(500);

    const hiddenCard = await deck.deal();
    hiddenCard.shown = false;
    dealerHand.addCard(hiddenCard);

    dispatch({
      type: "GAME::SET_STATUS",
      status: gameStatus.HIT_OR_STAND,
      playerCanHitOrStand: true,
    });
  };

  const getFinalDealerValue = async () => {
    const dealerCards = [...dealerHand.cards];

    if (calculateHandValue(dealerCards).high >= 17) {
      dispatch({ type: "GAME::SET_STATUS", status: gameStatus.STAND });
    }

    while (calculateHandValue(dealerCards).high < 17) {
      await sleep(500);
      const nextCard = await deck.deal();
      dealerHand.addCard(nextCard);
      dealerCards.push(nextCard);
    }

    return calculateHandValue(dealerCards);
  };

  const stand = async (): Promise<void> => {
    dispatch({
      type: "GAME::SET_STATUS",
      status: gameStatus.STAND,
      playerCanHitOrStand: false,
    });
    dealerHand.showAllCards();

    const dealerValue = await getFinalDealerValue();

    if (dealerValue.low > 21 && !playerHand.isBusted) {
      return dispatch({
        type: "GAME::SET_STATUS",
        status: gameStatus.DEALER_BUST,
      });
    }

    if (dealerValue.high === playerHand.value.high) {
      return dispatch({
        type: "GAME::SET_STATUS",
        status: gameStatus.DRAW,
      });
    }

    if (dealerValue.high > playerHand.value.high) {
      return dispatch({
        type: "GAME::SET_STATUS",
        status: gameStatus.DEALER_WINS,
      });
    }

    return dispatch({
      type: "GAME::SET_STATUS",
      status: gameStatus.PLAYER_WINS,
    });
  };

  const hit = async () => playerHand.addCard(await deck.deal());

  return { state, start, playerHand, dealerHand, hit, stand };
};

export default useGame;
