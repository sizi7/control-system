import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePicker.module.css';
import { ko } from 'date-fns/locale';

export default function YearRangePickerSingle() {
  const [yearRange, setYearRange] = useState([null, null]);
  const [startYear, endYear] = yearRange;

  const formatYear = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}년`;
  };

  const handleChange = (range) => {
    setYearRange(range);
    if (range[0] && range[1]) {
      console.log(
        `선택된 연도 범위: ${formatYear(range[0])} ~ ${formatYear(range[1])}`
      );
    }
  };

  return (
    <div>
      <DatePicker
        locale={ko}
        selectsRange
        startDate={startYear}
        endDate={endYear}
        onChange={handleChange}
        dateFormat="yyyy"
        showYearPicker
        placeholderText="연도 범위를 선택하세요"
        isClearable
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />
      {startYear && endYear && (
        <p>
          선택된 연도 범위: {formatYear(startYear)} ~ {formatYear(endYear)}
        </p>
      )}
    </div>
  );
}
