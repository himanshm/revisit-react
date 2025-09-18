import { useState } from 'react';
import Die from './components/Die';
import { generateAllNewDice } from './utils';

const App = () => {
  const [dice, setDice] = useState(generateAllNewDice(10));

  const rollAllDice = () => {
    setDice(generateAllNewDice(10));
  };

  const hold = id => {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  // pass hold as a closed-over function prop - no need to pass id
  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />
  ));

  return (
    <>
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice-btn" onClick={rollAllDice}>
          Roll
        </button>
      </main>
    </>
  );
};

export default App;
