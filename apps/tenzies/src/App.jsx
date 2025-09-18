import { useState } from 'react';
import Die from './components/Die';
import { generateAllNewDice } from './utils';

const App = () => {
  const [dice, setDice] = useState(generateAllNewDice());

  const rollAllDice = () => {
    setDice(generateAllNewDice());
  };
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} />);

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
