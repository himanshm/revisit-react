import BulletPoint from './BulletPoint';
const BulletList = props => {
  const { items } = props;
  return (
    <div className="bullet-list">
      {items.map(item => (
        <BulletPoint key={item.id} text={item.text} />
      ))}
    </div>
  );
};

export default BulletList;
