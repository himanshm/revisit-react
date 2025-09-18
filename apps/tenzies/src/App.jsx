import Die from './components/Die';
const App = () => {
  const dice = Array.from({ length: 10 }, () => ({
    id: crypto.randomUUID(),
    value: Math.ceil(Math.random() * 6)
  }));

  return (
    <main>
      <div className="dice-container">
        {dice.map(die => (
          <Die key={die.id} value={die.value} />
        ))}
      </div>
    </main>
  );
};

export default App;
