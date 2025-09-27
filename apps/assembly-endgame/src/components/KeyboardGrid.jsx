import { clsx } from '@revisit-react/config';

const KeyboardGrid = props => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const keyboardLayout = [10, 10, 6];

  let start = 0;
  const rows = keyboardLayout.map(size => {
    const row = [...alphabet].slice(start, start + size);
    start += size;
    return row;
  });

  return rows.map((row, rowIdx) => (
    <div key={rowIdx} className="keyboard-row">
      {row.map((letter, index) => {
        const isGuessed = props.guessedLetters.includes(letter);
        const isCorrect = isGuessed && props.word.includes(letter);
        const isWrong = isGuessed && !props.word.includes(letter);
        const classNames = clsx({
          'keyboard-btn': true,
          correct: isCorrect,
          wrong: isWrong
        });

        return (
          <button
            key={`${letter}-${index}`}
            // className={clsx(
            //   'keyboard-btn',
            //   isGuessed && (isCorrect ? 'correct' : 'wrong')
            // )}
            className={classNames}
            onClick={() => props.selectLetter(letter)}
            disabled={isGuessed || props.gameOver}
            aria-disabled={isGuessed}
            aria-label={`Letter ${letter}`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  ));
};

export default KeyboardGrid;

// Note: Clicking on same letter twice -> component renders twice -> on next click it doesn't render
