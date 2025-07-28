import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  const handleStartChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(date); // 시작일이 종료일보다 크면 종료일도 맞춰줌
    }
    console.log(`시작일: ${formatDate(date)}`);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
    console.log(`종료일: ${formatDate(date)}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={handleStartChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="yyyy-MM-dd"
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
      <span>~</span>
      <DatePicker
        locale={ko}
        selected={endDate}
        onChange={handleEndChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy-MM-dd"
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
    </div>
  );
}
