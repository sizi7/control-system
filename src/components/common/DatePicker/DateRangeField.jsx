import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateRangeField.module.css';

export default function DateRangeField({ value = [null, null], onChange }) {
  const [startDate, endDate] = value;

  const formatRange = (start, end) => {
    if (!start && !end) return '';
    if (start && !end) return `${format(start, 'yyyy-MM-dd')} ~`;
    if (!start && end) return `~ ${format(end, 'yyyy-MM-dd')}`;
    return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
  };

  const [inputValue, setInputValue] = useState(() =>
    formatRange(startDate, endDate)
  );
  const pickerRef = useRef(null);

  const handleChange = (dates) => {
    const [start, end] = dates;
    onChange([start, end]);
    setInputValue(formatRange(start, end));
  };

  const parseRangeInput = (text) => {
    const [startStr, endStr] = text.split('~').map((s) => s.trim());
    const start = parse(startStr, 'yyyy-MM-dd', new Date());
    const end = parse(endStr, 'yyyy-MM-dd', new Date());

    if (isValidDate(start) && isValidDate(end) && start <= end) {
      onChange([start, end]);
    }
  };

  const isValidDate = (d) => d instanceof Date && !isNaN(d);

  return (
    <DatePicker
      ref={pickerRef}
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      shouldCloseOnSelect={false}
      dateFormat="yyyy-MM-dd"
      customInput={
        <input
          className={styles.input}
          value={inputValue}
          placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => parseRangeInput(inputValue)}
        />
      }
    />
  );
}
