const LetterGrid = props => {
  const letters = [...props.word];
  //   const gridStyles = {
  //     display: 'grid',
  //     gridTemplateColumns: `repeat(${letters.length}, 4rem)`,
  //     gap: '0.2rem'
  //   };
  return letters.map((letter, index) => {
    const isRevealed = props.guessedLetters.includes(letter);
    return (
      <span key={`${letter}-${index}`} className="letter">
        {isRevealed ? letter : ''}
      </span>
    );
  });
};

export default LetterGrid;
