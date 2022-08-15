import Button from "~/components/Button";
import Hand from "~/components/Hand";
import Section from "~/components/Section";
import useGame from "~/hooks/use-game";

const Index = () => {
  const { start, hit, stand, state, playerHand, dealerHand } = useGame();

  const currentScore =
    playerHand.value.low === playerHand.value.high
      ? `You have ${playerHand.value.low}. `
      : `You have ${playerHand.value.low} or ${playerHand.value.high}. `;

  return (
    <div className="bl-container">
      <Section inline>
        <Button.Group>
          <Button onClick={() => start()}>New Game</Button>
          <Button
            theme="red"
            disabled={!state.playerCanHitOrStand}
            onClick={() => hit()}
          >
            Hit
          </Button>
          <Button
            theme="green"
            disabled={!state.playerCanHitOrStand}
            onClick={() => stand()}
          >
            Stand
          </Button>
        </Button.Group>
        <p className="bl-status-text">
          {currentScore}
          {state.status}
        </p>
      </Section>
      <Section>
        <Section.Title>Dealer's Hand</Section.Title>
        <Hand cards={dealerHand.cards} />
      </Section>
      <Section>
        <Section.Title>Your Hand</Section.Title>
        <Hand cards={playerHand.cards} />
      </Section>
    </div>
  );
};

export default Index;
