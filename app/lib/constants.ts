export const suits = ["spades", "hearts", "diamonds", "clubs"] as const;

export const aceRank = ["ace"] as const;
export const numberRank = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const pictureRank = ["jack", "queen", "king"] as const;
export const ranks = [...aceRank, ...numberRank, ...pictureRank] as const;

export const gameStatus = {
  NOT_STARTED: "The game has not started.",
  DEALING_CARDS: "Dealing cards...",
  HIT_OR_STAND: "You may hit or stand.",
  BUSTED: "Busted! The dealer wins.",
  STAND: "You have stood.",
  DEALER_BUST: "The dealer busted! You win!",
  DEALER_WINS: "Unlucky! The dealer wins.",
  PLAYER_WINS: "Jackpot! The player wins.",
  DRAW: "Nobody wins! You drew with the dealer.",
} as const;
