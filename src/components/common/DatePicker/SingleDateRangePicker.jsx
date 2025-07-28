// SingleDateRangePicker.jsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

export default function SingleDateRangePicker({
  value = [null, null],
  onChange,
}) {
  const [startDate, endDate] = value;

  // const formatDate = (date) => {
  //   if (!date) return '';
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   return `${year}년 ${month}월 ${day}일`;
  // };

  const handleChange = (range) => {
    onChange?.(range);
  };

  return (
    <div>
      <DatePicker
        locale={ko}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={handleChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜 범위를 선택하세요"
        isClearable
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
      {/* {startDate && endDate && (
        <p>
          선택된 범위: {formatDate(startDate)} ~ {formatDate(endDate)}
        </p>
      )} */}
    </div>
  );
}
