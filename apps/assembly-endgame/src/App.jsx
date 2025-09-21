import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import KeyboardGrid from './components/KeyboardGrid';
import LanguageChip from './components/LanguageChip';
import LetterGrid from './components/LetterGrid';
import { languages } from './data';

const AssemblyEndgame = () => {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const updateGussedLetter = letter => {
    setGuessedLetters(prevLetters =>
      !prevLetters.includes(letter) ? [...prevLetters, letter] : prevLetters
    );
  };

  const wrongGuessCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  const isGameWon = [...currentWord].every(letter =>
    guessedLetters.includes(letter)
  );

  const isGameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = isGameLost || isGameWon;

  const { bgClass, content } = GameStatus({ status: 'win' });

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
      <section className={`game-status ${bgClass}`}>{content}</section>
      <section className="language-chips">{languageElements}</section>
      <section className="letter-grid">
        <LetterGrid word={currentWord} guessedLetters={guessedLetters} />
      </section>
      <section className="keyboard">
        <KeyboardGrid
          selectLetter={updateGussedLetter}
          guessedLetters={guessedLetters}
          word={currentWord}
        />
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
};

export default AssemblyEndgame;
