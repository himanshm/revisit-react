import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Die from './components/Die';
import { generateAllNewDice, generateDie } from './utils';

const App = () => {
  const { height, width } = useWindowSize();
  const [dice, setDice] = useState(() => generateAllNewDice(10));
  const btnRef = useRef(null);

  const gameWon =
    dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value);

  const rollDice = () => {
    if (!gameWon) {
      setDice(oldDice =>
        oldDice.map(die => (die.isHeld ? die : generateDie()))
      );
    } else {
      setDice(() => generateAllNewDice(10));
    }
  };

  const hold = id => {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  // When game is won, the new game button automatically receives keyboard focus
  useEffect(() => {
    if (gameWon && btnRef.current) {
      btnRef.current.focus();
    }
  }, [gameWon]);

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
        {gameWon && <Confetti height={height} width={width} />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice-btn" onClick={rollDice} ref={btnRef}>
          {gameWon ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  );
};

export default App;
