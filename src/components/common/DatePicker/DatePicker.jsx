// DatePicker.jsx
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

export default function DatePicker({ value, onChange }) {
  // const formatDate = (date) => {
  //   if (!date) return '';
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  const handleChange = (date) => {
    onChange?.(date);
  };

  return (
    <div>
      <ReactDatePicker
        locale={ko}
        selected={value}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜를 선택하세요"
        className={styles.input}
        calendarClassName={styles.customCalendar}
        isClearable
      />
      {/* {value && <p>선택된 날짜: {formatDate(value)}</p>} */}
    </div>
  );
}
