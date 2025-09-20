const LanguageChip = props => {
  const { backgroundColor, color } = props;
  const styles = {
    backgroundColor,
    color
  };
  return (
    <span style={styles} className="chip">
      {props.name}
    </span>
  );
};

export default LanguageChip;
