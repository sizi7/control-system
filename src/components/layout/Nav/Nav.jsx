import { useEffect, useState } from 'react';
import styles from './Nav.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdHome, MdPeople, MdSettings } from 'react-icons/md';
import { FaHospital } from 'react-icons/fa';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

function SideNav({ isOpen, toggle }) {
  const location = useLocation();
  const [isHovering, setIsHovering] = useState(false);
  const navOpen = isOpen || isHovering;
  const [expandedIndexes, setExpandedIndexes] = useState(() => {
    const saved = localStorage.getItem('expanded-menus');
    return saved ? JSON.parse(saved) : [];
  });
  const [_, setShowLabels] = useState(navOpen);

  const menu = [
    { icon: <MdHome />, label: 'Dashboard', path: '/' },
    { icon: <FaHospital />, label: '기관', path: '/organization' },
    {
      icon: <MdPeople />,
      label: 'Patients',
      children: [
        { label: 'Patient', path: '/patients' },
        { label: 'Admission History', path: '/admissions' },
      ],
    },
    {
      icon: <MdSettings />,
      label: 'Settings',
      children: [
        { label: 'Profile', path: '/profile' },
        { label: 'Notifications', path: '/notifications' },
      ],
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) => {
      let next;
      if (prev.includes(index)) {
        next = prev.filter((i) => i !== index); // 닫기
      } else {
        next = [...prev, index]; // 열기
      }
      localStorage.setItem('expanded-menus', JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    if (navOpen) {
      const timer = setTimeout(() => {
        setShowLabels(true);
      }, 400); // ← 0.4초 뒤에 label 표시
      return () => clearTimeout(timer);
    } else {
      setShowLabels(false); // ← 닫힐 땐 즉시 숨김
    }
  }, [navOpen]);

  const isParentActive = (item) => {
    if (item.path && location.pathname === item.path) return true;
    if (item.children) {
      return item.children.some((child) =>
        location.pathname.startsWith(child.path)
      );
    }
    return false;
  };

  return (
    <div
      className={`${styles.sideNav} ${!navOpen ? styles.collapsed : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button className={styles.hamburger} onClick={toggle}>
        <RxHamburgerMenu />
        {navOpen && <img src="/imgs/logo-white.svg" alt="thynC logo" />}
      </button>
      <ul className={styles.menuItems}>
        {menu.map((item, i) => (
          <li key={i} className={styles.menuItem}>
            {item.children ? (
              <div
                className={classNames(styles.parentItem, {
                  [styles.active]: isParentActive(item),
                })}
                onClick={() => toggleExpand(i)}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span
                  className={`${styles.label} ${!navOpen ? styles.hidden : ''}`}
                >
                  {item.label}
                </span>
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  classNames(styles.parentItem, {
                    [styles.active]: isActive,
                  })
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                <span
                  className={`${styles.label} ${!navOpen ? styles.hidden : ''}`}
                >
                  {item.label}
                </span>
              </NavLink>
            )}

            {item.children && expandedIndexes.includes(i) && (
              <ul className={styles.subMenu}>
                {item.children.map((sub, j) => (
                  <li key={j} className={styles.subMenuItem}>
                    <NavLink
                      to={sub.path}
                      className={({ isActive }) =>
                        classNames(styles.subLabel, {
                          [styles.hidden]: !navOpen,
                          [styles.active]: isActive,
                        })
                      }
                    >
                      {sub.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
