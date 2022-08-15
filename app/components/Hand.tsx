import clsx from "clsx";
import type { HTMLProps } from "react";
import type { ICard } from "~/lib/blackjack/Card";
import PlayingCard from "./PlayingCard";

interface HandProps extends HTMLProps<HTMLDivElement> {
  cards: Array<ICard>;
}

const Hand: React.FC<HandProps> = ({ className, cards, ...rest }) => {
  return (
    <div className={clsx("bl-hand", className)} {...rest}>
      {cards.map((card) => (
        <PlayingCard
          shown={card.shown}
          suit={card.suit}
          rank={card.rank}
          key={`${card.rank}-${card.suit}`}
        />
      ))}
    </div>
  );
};

export default Hand;
