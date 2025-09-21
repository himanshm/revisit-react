import { clsx } from '@revisit-react/config';
import { statusConfig } from '../data';

const GameStatus = ({ gameStatus, langLost }) => {
  const { status, won, lost } = gameStatus;
  const { heading, message } = statusConfig[status] || {};
  const h2Text =
    heading &&
    (langLost && status === 'loseLanguage'
      ? `${heading} ${langLost}`
      : heading);

  const gameStatusClass = clsx('game-status', {
    won,
    lost
  });
  return (
    <section className={gameStatusClass}>
      {h2Text && <h2>{h2Text}</h2>}
      {message && <p>{message}</p>}
    </section>
  );
};

export default GameStatus;
