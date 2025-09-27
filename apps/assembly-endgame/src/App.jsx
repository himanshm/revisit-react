import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import KeyboardGrid from './components/KeyboardGrid';
import LanguageChip from './components/LanguageChip';
import LetterGrid from './components/LetterGrid';
import { getRandomWord, languages } from './data';
import useGameState from './hooks/useGameState';
/**
 * Backlog:
 *
 * - Fix a11y issues ally-accessibility
 * - Make the new game button work
 * - Choose a random word from a list of words
 * - Confetti drop when the user wins
 */

const AssemblyEndgame = () => {
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Hooks
  const {
    wrongGuessCount,
    isGameOver,
    gameStatus,
    farewellText,
    lastGuessedLetter,
    numGuessedLeft
  } = useGameState(currentWord, guessedLetters, languages);

  const updateGuessedLetter = letter => {
    setGuessedLetters(prevLetters =>
      !prevLetters.includes(letter) ? [...prevLetters, letter] : prevLetters
    );
  };

  const languageElements = languages.map((lang, index) => (
    <LanguageChip
      key={lang.id}
      {...lang}
      index={index}
      wrongGuesses={wrongGuessCount}
    />
  ));

  const handleResetGame = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  };

  return (
    <main className="app-container">
      <Header />
      <GameStatus gameStatus={gameStatus} farewellText={farewellText} />
      <section className="language-chips">{languageElements}</section>
      <section className="letter-grid">
        <LetterGrid
          word={currentWord}
          guessedLetters={guessedLetters}
          isGameLost={gameStatus.lost}
        />
      </section>
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! the letter ${lastGuessedLetter} is in the word.`
            : `Sorry! the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessedLeft} letters left.
        </p>
        <p>
          Current word:{' '}
          {[...currentWord]
            .map(letter =>
              guessedLetters.includes(letter) ? letter + '.' : 'blank.'
            )
            .join(' ')}
        </p>
      </section>
      <section className="keyboard">
        <KeyboardGrid
          selectLetter={updateGuessedLetter}
          guessedLetters={guessedLetters}
          word={currentWord}
          gameOver={isGameOver}
        />
      </section>
      {isGameOver && (
        <button className="new-game" onClick={handleResetGame}>
          New Game
        </button>
      )}
    </main>
  );
};

export default AssemblyEndgame;
