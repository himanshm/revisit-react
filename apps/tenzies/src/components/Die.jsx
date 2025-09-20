const Die = props => {
  return (
    <button
      onClick={props.hold}
      className={`die ${props.isHeld ? 'dice-held' : ''}`}
      aria-pressed={props.isHeld}
      aria-label={`die with value ${props.value}, ${props.isHeld ? 'held' : 'not held'}`}
    >
      {props.value}
    </button>
  );
};

export default Die;
