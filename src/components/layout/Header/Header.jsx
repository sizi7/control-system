import styles from './Header.module.css';
import '../../../index.css';
import Input from '@/components/common/Input/Input';
import useSearchStore from '@/stores/search';
import { useState } from 'react';

const Header = () => {
  const { setSearchTerm } = useSearchStore();
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue.trim());
      console.log('inputvalue', inputValue);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력값이 없으면 자동으로 검색 초기화
    if (value.trim() === '') {
      setSearchTerm('');
    }
  };

  return (
    <div className={styles.header}>
      <div>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="병원 검색"
        />
      </div>
      <div>
        <span className="company">소속</span>
        <span className={styles.name}>닉네임</span>
        <button className={styles.logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
