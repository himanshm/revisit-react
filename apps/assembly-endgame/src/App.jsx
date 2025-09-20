import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Header from './components/Header';
import KeyboardGrid from './components/KeyboardGrid';
import LanguageChip from './components/LanguageChip';
import LetterGrid from './components/LetterGrid';
import { languages } from './data';

const AssemblyEndgame = () => {
  const [currentWord, setCurrentWord] = useState('react');
  const { bgClass, content } = GameStatus({ status: 'win' });
  const languageElements = languages.map(lang => (
    <LanguageChip key={lang.id} {...lang} />
  ));

  return (
    <main>
      <Header />
      <section className={`game-status ${bgClass}`}>{content}</section>
      <section className="language-chips">{languageElements}</section>
      <section className="letter-grid">
        <LetterGrid word={currentWord} />
      </section>
      <section className="keyboard">
        <KeyboardGrid />
      </section>
      <button className="new-game">New Game</button>
    </main>
  );
};

export default AssemblyEndgame;
