import { clsx } from '@revisit-react/config';

const LanguageChip = props => {
  const { backgroundColor, color } = props;
  const isLanguageLost = props.index < props.wrongGuesses;
  const styles = {
    backgroundColor,
    color
  };
  return (
    <span style={styles} className={clsx('chip', isLanguageLost && 'lost')}>
      {props.name}
    </span>
  );
};

export default LanguageChip;
