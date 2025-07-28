import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import styles from './DatePicker.module.css';

// 📌 월 포맷을 "2025년 7월" 형태로 출력
const formatMonthKorean = (date) => {
  if (!date) return '';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

export default function MonthRangePickerSingle() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [start, end] = dateRange;

  const handleChange = (range) => {
    // 📌 날짜를 월 시작일과 월 마지막일로 맞춤
    if (range[0]) {
      const startOfMonth = new Date(
        range[0].getFullYear(),
        range[0].getMonth(),
        1
      );
      range[0] = startOfMonth;
    }
    if (range[1]) {
      const endOfMonth = new Date(
        range[1].getFullYear(),
        range[1].getMonth() + 1,
        0
      );
      range[1] = endOfMonth;
    }

    setDateRange(range);

    if (range[0] && range[1]) {
      console.log(
        `선택된 월 범위: ${formatMonthKorean(range[0])} ~ ${formatMonthKorean(range[1])}`
      );
    }
  };

  return (
    <div>
      <DatePicker
        locale={ko}
        selectsRange
        startDate={start}
        endDate={end}
        onChange={handleChange}
        dateFormat="yyyy-MM"
        placeholderText="월 범위를 선택하세요"
        showMonthYearPicker
        isClearable
        className={styles.input}
        calendarClassName={styles.customCalendar}
      />

      {start && end && (
        <p>
          선택된 월 범위: {formatMonthKorean(start)} ~ {formatMonthKorean(end)}
        </p>
      )}
    </div>
  );
}
