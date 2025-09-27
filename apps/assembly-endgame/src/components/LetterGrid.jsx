import { clsx } from '@revisit-react/config';

const LetterGrid = props => {
  const letters = [...props.word];
  return letters.map((letter, index) => {
    const shouldRevealLetter =
      props.isGameLost || props.guessedLetters.includes(letter);

    const letterClassName = clsx(
      'letter',
      props.isGameLost &&
        !props.guessedLetters.includes(letter) &&
        'missed-letter'
    );
    return (
      <span key={`${letter}-${index}`} className={letterClassName}>
        {shouldRevealLetter ? letter : ''}
      </span>
    );
  });
};

export default LetterGrid;
