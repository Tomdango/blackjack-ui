import { pictureRank } from "./constants";
import type { CardValue, ICard } from "./types";

export const calculateCardValue = (card: ICard) => {
  //   Number Card
  if (typeof card.rank === "number") {
    return { high: card.rank, low: card.rank };
  }

  //   Ace Card
  if (card.rank === "ace") {
    return { high: 11, low: 1 };
  }

  //   Picture Card
  if (pictureRank.includes(card.rank)) {
    return { high: 10, low: 10 };
  }

  throw new Error(`Invalid Rank: ${card.rank}`);
};

export const calculateHandValue = (cards: Array<ICard>): CardValue => {
  const handValue = cards.reduce(
    (prevValue, card) => {
      const cardValue = calculateCardValue(card);
      return {
        low: prevValue.low + cardValue.low,
        high: prevValue.high + cardValue.high,
      };
    },
    { low: 0, high: 0 }
  );

  if (handValue.high > 21 && handValue.low <= 21) {
    return { high: handValue.low, low: handValue.low };
  }

  return handValue;
};
