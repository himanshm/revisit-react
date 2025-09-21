import { getFarewellText } from '../data';

const useGameState = (currentWord, guessedLetters, languages) => {
  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  const isGameWon = [...currentWord].every(letter =>
    guessedLetters.includes(letter)
  );

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = isGameLost || isGameWon;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessedIncorrect =
    lastGuessedLetter && ![...currentWord].includes(lastGuessedLetter);

  const farewellText =
    wrongGuessCount > 0 && isLastGuessedIncorrect
      ? getFarewellText(languages[wrongGuessCount - 1].name)
      : null;

  const status = isGameOver ? (isGameWon ? 'won' : 'lost') : null;

  return {
    wrongGuessCount,
    isGameWon,
    isGameLost,
    isGameOver,
    farewellText,
    gameStatus: {
      status,
      won: isGameWon,
      lost: isGameLost,
      showFarewell: !isGameOver && isLastGuessedIncorrect,
      lastGuessIncorrect: isLastGuessedIncorrect
    }
  };
};

export default useGameState;
