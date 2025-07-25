// components/Breadcrumbs/Breadcrumbs.jsx
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import PATH_LABELS from '@/constants/pathLabels';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const crumbs = pathnames.map((_, index) => {
    const segments = pathnames.slice(0, index + 1);
    const to = '/' + segments.join('/');
    const key = segments.join('/');
    const value = PATH_LABELS[key] || PATH_LABELS[segments.at(-1)] || key;

    return {
      to,
      ...(typeof value === 'object' ? value : { label: value }),
    };
  });

  const home = PATH_LABELS[''];
  const homeCrumb = {
    to: '/',
    ...(typeof home === 'object' ? home : { label: home }),
  };

  const fullCrumbs = [homeCrumb, ...crumbs];

  return (
    <nav className={styles.breadcrumb}>
      {fullCrumbs.map((crumb, idx) => {
        const isLast = idx === fullCrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <span key={idx}>
            {isLast ? (
              <span className={styles.current}>
                {Icon && (
                  <Icon
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                  />
                )}
                {crumb.label}
              </span>
            ) : (
              <>
                <Link to={crumb.to}>
                  {Icon && (
                    <Icon
                      style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    />
                  )}
                  {crumb.label}
                </Link>
                <span className={styles.separator}>›</span>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
