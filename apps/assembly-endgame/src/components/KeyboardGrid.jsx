const KeyboardGrid = props => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const keyboardLayout = [10, 10, 6];

  let start = 0;
  const rows = keyboardLayout.map(size => {
    const row = [...alphabet].slice(start, start + size);
    start += size;
    return row;
  });

  return rows.map((row, rowIdx) => (
    <div key={rowIdx} className="keyboard-row">
      {row.map((letter, index) => (
        <button
          key={`${letter}-${index}`}
          className="keyboard-btn"
          onClick={() => props.selectLetter(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  ));
};

export default KeyboardGrid;

// Note: Clicking on same letter twice -> component renders twice -> on next click it doesn't render
