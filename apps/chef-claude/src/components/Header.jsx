import chefClaudeImg from '../assets/chef-claude.png';

function Header() {
  return (
    <header className="header">
      <img src={chefClaudeImg} alt="chef-claude logo" className="logo-img" />
      <h1>Chef Claude</h1>
    </header>
  );
}

export default Header;
