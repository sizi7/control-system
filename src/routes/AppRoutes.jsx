import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound/NotFound';
import Template from '../pages/Template/Template';

const AppRoutes = () => {
  return (
    <Routes>
      {/* layout이 없는 페이지 */}
      <Route path="/login" element={<Login />} />
      <Route path="/template" element={<Template />} />

      {/* layout이 있는 페이지 */}
      <Route
        path="/"
        element={
          <Layout
            headerProps={{ title: 'My Website', rightContent: <button>Logout</button> }}
            navItems={[
              { label: 'Home', to: '/' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ]}
            footerText="© 2025 MyCompany. All rights reserved."
          />
        }
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
