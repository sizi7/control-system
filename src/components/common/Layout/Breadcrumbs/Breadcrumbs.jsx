// components/Breadcrumbs/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ name }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const crumbs = pathnames.map((_, index) => {
    const segments = pathnames.slice(0, index + 1);
    const to = '/' + segments.join('/');
    return { to };
  });

  return (
    <nav className={styles.breadcrumb}>
      <Link to="/" className={styles.home}>
        홈
      </Link>
      <span className={styles.separator}>›</span>

      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;
        return (
          <span key={idx}>
            {isLast ? (
              <span className={styles.current}>{name}</span>
            ) : (
              <>
                <Link to={crumb.to}>상위</Link>
                <span className={styles.separator}>›</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
