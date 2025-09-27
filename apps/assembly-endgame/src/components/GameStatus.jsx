import { clsx } from '@revisit-react/config';
import { statusConfig } from '../data';

const GameStatus = ({ gameStatus, farewellText }) => {
  const { status, won, lost, showFarewell, lastGuessIncorrect } = gameStatus;
  const { heading, message } = statusConfig[status] || {};

  const messageText = showFarewell && farewellText ? farewellText : message;

  const gameStatusClass = clsx('game-status', {
    won,
    lost,
    farewell: lastGuessIncorrect
  });

  const messageClass = lastGuessIncorrect ? 'farewell-message' : '';

  return (
    <section className={gameStatusClass} aria-live="polite" role="status">
      {<h2>{heading}</h2>}
      {<p className={messageClass}>{messageText}</p>}
    </section>
  );
};

export default GameStatus;
