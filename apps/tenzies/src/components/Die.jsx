const Die = props => {
  return <button className={`die ${props.isHeld ? 'dice-held' : ''}`}>{props.value}</button>;
};

export default Die;
