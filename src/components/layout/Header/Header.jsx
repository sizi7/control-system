import styles from './Header.module.css';
import '../../../index.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <span className="company">소속</span>
        <span className={styles.name}>닉네임</span>
        <button className={styles.logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
