const BulletPoint = props => {
  return (
    <div className="bullet-point">
      <span className="bullet" />
      <span className="bullet-text">{props.text}</span>
    </div>
  );
};

export default BulletPoint;
