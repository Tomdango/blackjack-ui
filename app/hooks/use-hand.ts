import { useMemo, useState } from "react";
import type { CardValue, ICard } from "~/lib/types";
import { calculateHandValue } from "~/lib/utils";

const useHand = () => {
  const [cards, setCards] = useState<Array<ICard>>([]);
  const [value, setValue] = useState<CardValue>({ low: 0, high: 0 });

  const addCard = (card: ICard) => {
    setCards((prevCards) => {
      const newCards = [...prevCards, card];
      setValue(calculateHandValue(newCards));
      return newCards;
    });
  };

  const reset = () => setCards([]);

  const showAllCards = () =>
    setCards((allCards) => allCards.map((card) => ({ ...card, shown: true })));

  const isBlackjack = useMemo(() => {
    return cards.length === 2 && value.high === 21;
  }, [cards, value]);

  const isBusted = useMemo(() => {
    return value.low > 21 && value.high > 21;
  }, [value]);

  return {
    cards,
    addCard,
    showAllCards,
    reset,
    value,
    isBlackjack,
    isBusted,
  };
};

export default useHand;
