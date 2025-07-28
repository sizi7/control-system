import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

const DefaultMonthPicker = () => {
  const [selectMonth, setSelectMonth] = useState(new Date());

  const formatMonth = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleChange = (date) => {
    setSelectMonth(date);
    console.log('선택된 월:', formatMonth(date));
  };

  return (
    <DatePicker
      locale={ko}
      selected={selectMonth}
      onChange={handleChange}
      dateFormat="yyyy-MM"
      showMonthYearPicker
      className={styles.input}
      calendarClassName={styles.customCalendar}
    />
  );
};

export default DefaultMonthPicker;
