import clsx from "clsx";
import type { HTMLProps } from "react";
import type { ranks, suits } from "~/lib/constants";

interface PlayingCardProps extends HTMLProps<HTMLImageElement> {
  shown: boolean;
  crossOrigin?: "" | "anonymous" | "use-credentials";
  suit: typeof suits[number];
  rank: typeof ranks[number];
}

const PlayingCard: React.FC<PlayingCardProps> = ({
  className,
  shown,
  suit,
  rank,
  ...rest
}) => {
  const cardImageURL = `/_static/assets/playing-cards/${rank}_of_${suit}.svg`;

  return (
    <div
      className={clsx("bl-playing-card", !shown && "bl-playing-card--hidden")}
    >
      <div className="bl-playing-card__inner">
        <div className="bl-playing-card__face">
          {shown && (
            <img
              src={cardImageURL}
              className={clsx("bl-playing-card__image", className)}
              alt={`${rank} of ${suit}`}
              {...rest}
            />
          )}
        </div>
        <div className="bl-playing-card__back"></div>
      </div>
    </div>
  );
};

export default PlayingCard;
