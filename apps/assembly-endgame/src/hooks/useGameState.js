const useGameState = (currentWord, guessedLetters, languages) => {
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  const isGameWon = [...currentWord].every(letter =>
    guessedLetters.includes(letter)
  );

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = isGameLost || isGameWon;

  return {
    wrongGuessCount,
    isGameWon,
    isGameLost,
    isGameOver,
    gameStatus: {
      status: isGameOver ? (isGameWon ? 'won' : 'lost') : null,
      won: isGameWon,
      lost: isGameLost
    }
  };
};

export default useGameState;
