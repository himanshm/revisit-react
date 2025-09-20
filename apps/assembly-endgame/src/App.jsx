import GameStatus from './components/GameStatus';
import Header from './components/Header';
import LanguageChip from './components/LanguageChip';
import { languages } from './data';

const AssemblyEndgame = () => {
  const { bgClass, content } = GameStatus({ status: 'win' });
  const languageElements = languages.map(lang => (
    <LanguageChip key={lang.id} {...lang} />
  ));

  return (
    <main>
      <Header />
      <section className={`game-status ${bgClass}`}>{content}</section>
      <section className="language-chips">{languageElements}</section>
    </main>
  );
};

export default AssemblyEndgame;
