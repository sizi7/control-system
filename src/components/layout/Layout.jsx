import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = ({ headerProps, navItems, footerText }) => {
  return (
    <div className="layout">
      <Header {...headerProps} />
      <Nav items={navItems} />
      <main className="main">
        <Outlet />
      </main>
      <Footer text={footerText} />
    </div>
  );
};

export default Layout;
