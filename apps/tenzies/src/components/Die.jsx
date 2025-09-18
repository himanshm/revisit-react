const Die = props => {
  return (
    <button
      onClick={props.hold}
      className={`die ${props.isHeld ? 'dice-held' : ''}`}
    >
      {props.value}
    </button>
  );
};

export default Die;
