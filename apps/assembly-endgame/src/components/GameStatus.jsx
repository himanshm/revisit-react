import { clsx } from '@revisit-react/config';
import { statusConfig } from '../data';

const GameStatus = ({ status, langLost }) => {
  const { heading, message, class: bgClass } = statusConfig[status] || {};
  const h2Text =
    heading &&
    (langLost && status === 'loseLanguage'
      ? `${heading} ${langLost}`
      : heading);

  return (
    <section className={clsx('game-status', bgClass)}>
      {h2Text && <h2>{h2Text}</h2>}
      {message && <p>{message}</p>}
    </section>
  );
};

export default GameStatus;
