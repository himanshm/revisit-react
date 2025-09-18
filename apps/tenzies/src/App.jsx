import { useState } from 'react';
import Die from './components/Die';

const App = () => {
  const generateAllNewDice = () =>
    Array.from({ length: 10 }, () => ({
      // id: crypto.randomUUID(),
      id: Math.random().toString(36).slice(2, 8), // Other way to generate random ids
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }));

  const [dice, setDice] = useState(generateAllNewDice());

  const handleDiceRoll = () => {
    setDice(generateAllNewDice());
  };
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />);

  return (
    <>
      <main>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice-btn" onClick={handleDiceRoll}>
          Roll
        </button>
      </main>
    </>
  );
};

export default App;
