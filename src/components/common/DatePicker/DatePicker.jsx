import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateKorean = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    console.log('선택된 날짜:', formatDateKorean(date));
  };

  return (
    <div>
      <ReactDatePicker
        locale={ko}
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
      <p>선택된 날짜: {formatDateKorean(selectedDate)}</p>
    </div>
  );
}
