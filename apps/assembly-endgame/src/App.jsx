import GameStatus from './components/GameStatus';
import Header from './components/Header';

const AssemblyEndgame = () => {
  return (
    <main>
      <Header />
      <GameStatus status="win" />
    </main>
  );
};

export default AssemblyEndgame;
