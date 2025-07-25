import { useEffect, useState } from 'react';
import styles from './SideNav.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdHome, MdPeople, MdSettings } from 'react-icons/md';
import { FaHospitalAlt } from 'react-icons/fa';

function SideNav({ isOpen, toggle }) {
  const [isHovering, setIsHovering] = useState(false);
  const navOpen = isOpen || isHovering;
  const [expandedIndexes, setExpandedIndexes] = useState(() => {
    const saved = localStorage.getItem('expanded-menus');
    return saved ? JSON.parse(saved) : [];
  });
  const [showLabels, setShowLabels] = useState(navOpen);

  const menu = [
    { icon: <MdHome />, label: 'Dashboard', path: '/' },
    { icon: <FaHospitalAlt />, label: '기관', path: '/hospital' },
    {
      icon: <MdPeople />,
      label: 'Patients',
      children: [
        { label: 'Patient List', path: '/patients' },
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

  console.log('menu', menu);

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

  return (
    <div
      className={`${styles.sideNav} ${!navOpen ? styles.collapsed : ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button className={styles.hamburger} onClick={toggle}>
        <RxHamburgerMenu />
        {navOpen && <img src="/logo-white.svg" alt="thynC logo" />}
      </button>
      <ul className={styles.menuItems}>
        {menu.map((item, i) => (
          <li key={i} className={styles.menuItem}>
            <div className={styles.parentItem} onClick={() => toggleExpand(i)}>
              <span className={styles.icon}>{item.icon}</span>
              <span
                className={`${styles.label} ${!navOpen ? styles.hidden : ''}`}
              >
                {item.label}
              </span>
            </div>

            {item.children && expandedIndexes.includes(i) && navOpen && (
              <ul className={styles.subMenu}>
                {item.children.map((sub, j) => (
                  <li key={j} className={styles.subMenuItem}>
                    {sub.label}
                    {/* <NavLink to={sub.path}>{sub.label}</NavLink> */}
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
