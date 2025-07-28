// MonthRangePicker.jsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

export default function MonthRangePicker({ value = {}, onChange }) {
  const [startMonth, setStartMonth] = useState(value.start || null);
  const [endMonth, setEndMonth] = useState(value.end || null);

  //   useEffect(() => {
  //     console.log('📅 MonthRangePicker - start:', startMonth, 'end:', endMonth);
  //   }, [startMonth, endMonth]);

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <DatePicker
        locale={ko}
        selected={startMonth}
        onChange={(date) => {
          setStartMonth(date);
          onChange?.({ start: date, end: endMonth });
        }}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        selectsStart
        startDate={startMonth}
        endDate={endMonth}
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
      <span>~</span>
      <DatePicker
        locale={ko}
        selected={endMonth}
        onChange={(date) => {
          setEndMonth(date);
          onChange?.({ start: startMonth, end: date });
        }}
        dateFormat="yyyy-MM"
        showMonthYearPicker
        selectsEnd
        startDate={startMonth}
        endDate={endMonth}
        minDate={startMonth}
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
    </div>
  );
}
