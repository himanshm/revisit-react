import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import KeyboardGrid from './components/KeyboardGrid';
import LanguageChip from './components/LanguageChip';
import LetterGrid from './components/LetterGrid';
import { languages } from './data';
import useGameState from './hooks/useGameState';
/**
 * Backlog:
 *
 * - Farewell messages in status section
 * - Fix a11y issues ally-accessibility
 * - Make the new game button work
 * - Choose a random word from a list of words
 * - Confetti drop when the user wins
 */

const AssemblyEndgame = () => {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Hooks
  const { wrongGuessCount, isGameOver, gameStatus, farewellText } =
    useGameState(currentWord, guessedLetters, languages);

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

  return (
    <main className="app-container">
      <Header />
      <GameStatus gameStatus={gameStatus} farewellText={farewellText} />
      <section className="language-chips">{languageElements}</section>
      <section className="letter-grid">
        <LetterGrid word={currentWord} guessedLetters={guessedLetters} />
      </section>
      <section className="keyboard">
        <KeyboardGrid
          selectLetter={updateGuessedLetter}
          guessedLetters={guessedLetters}
          word={currentWord}
        />
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
};

export default AssemblyEndgame;
