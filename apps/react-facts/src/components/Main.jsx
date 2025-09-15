import BulletList from './BulletList';
const Main = () => {
  const facts = [
    { id: 1, text: 'Was first released in 2013' },
    { id: 2, text: 'Was originally created by Jordan Walke' },
    { id: 3, text: 'Has well over 100K stars on GitHub' },
    { id: 4, text: 'Is maintained by Meta' },
    { id: 5, text: 'Powers thousands of enterprise apps, including mobile apps' }
  ];
  return (
    <main>
      <h1>Fun facts about React</h1>
      <BulletList items={facts} />

      {/* <ul className="facts-list">
          <li>Was first released in 2013</li>
          <li>Was originally created by Jordan Walke</li>
          <li>Has well over 200K stars on GitHub</li>
          <li>Is maintained by Meta</li>
          <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul> */}
    </main>
  );
};

export default Main;
