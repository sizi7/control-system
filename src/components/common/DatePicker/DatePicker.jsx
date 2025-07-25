import { useState } from 'react';
import DatePicker from 'react-datepicker';
import styles from './DatePicker.module.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function BirthdayPicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value || null);

  const handleChange = (date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>생년월일</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        maxDate={new Date()}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        className={styles.input} // ✅ 커스텀 스타일 적용
      />
    </div>
  );
}
