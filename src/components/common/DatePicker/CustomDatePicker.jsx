import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CustomDatePicker.module.css';

// 🎯 MaskedInput 컴포넌트 - 반드시 inputRef 사용
const MaskedInput = forwardRef(
  ({ value, onChange, onClick, placeholder }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <InputMask
          mask="9999-99-99"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          inputRef={ref} // ⬅️ 핵심: react-datepicker가 DOM 참조 가능해야 함
        />
        <button type="button" className={styles.icon} onClick={onClick}>
          <img src="/icons/icon-calendar.svg" alt="calendar" />
        </button>
      </div>
    );
  }
);

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
}) {
  const [inputValue, setInputValue] = useState('');

  const handleDateChange = (date) => {
    onChange(date);
    if (date instanceof Date && !isNaN(date)) {
      const formatted = date.toISOString().slice(0, 10); // yyyy-mm-dd
      setInputValue(formatted);
    }
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      const parsed = new Date(raw);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    }
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleDateChange}
      customInput={
        <MaskedInput
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
      }
      dateFormat="yyyy-MM-dd"
      popperPlacement="bottom-start"
    />
  );
}
