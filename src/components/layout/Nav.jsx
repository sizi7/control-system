import './layout.css';
import { Link } from 'react-router-dom';

const Nav = ({ items = [] }) => {
  return (
    <nav className="nav">
      {items.map((item) => (
        <Link key={item.to} to={item.to}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
