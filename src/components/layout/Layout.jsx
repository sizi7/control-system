import Header from './Header/Header';
import Nav from './Nav/Nav';
import { Outlet } from 'react-router-dom';
import './layout.css';
import { useEffect, useState } from 'react';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sidenav-open');
    if (saved !== null) setIsOpen(saved === 'true');
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('sidenav-open', isOpen);
    }
  }, [isOpen, isReady]);

  if (!isReady) return null;

  return (
    <div className="layout">
      <Header />
      <Nav isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <main
        className="main"
        style={{
          marginLeft: isOpen ? '200px' : '60px',
          flex: 1,
          transition: '0.3s',
        }}
      >
        <Outlet />
      </main>
      {/* <Footer text={footerText} /> */}
    </div>
  );
};

export default Layout;
