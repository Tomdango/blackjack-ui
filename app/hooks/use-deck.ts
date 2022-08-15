import { range, shuffle } from "lodash/fp";
import { useState } from "react";
import { ranks, suits } from "~/lib/constants";
import type { ICard } from "~/lib/types";

const createDeck = () => {
  const cards = suits.flatMap((suit) =>
    ranks.map((rank) => ({ suit, rank, shown: true }))
  );

  return range(0, 7).reduce(shuffle, cards);
};

const useDeck = () => {
  const [cards, setCards] = useState<Array<ICard>>([]);

  const deal = () =>
    new Promise<ICard>((res, rej) => {
      setCards((updatedCards) => {
        const card = updatedCards.shift();
        if (!card) rej(new Error("No more cards to deal"));
        else res(card);
        return updatedCards;
      });
    });

  const reset = () => setCards(createDeck());

  return { cards, reset, setCards, deal };
};

export default useDeck;
