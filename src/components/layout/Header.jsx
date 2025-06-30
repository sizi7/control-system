import './layout.css';

const Header = ({ title, rightContent }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <div>{rightContent}</div>
    </header>
  );
};

export default Header;
