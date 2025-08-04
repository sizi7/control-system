import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, parse } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export default function SingleInputDateRange({
  value = [null, null],
  onChange,
}) {
  const [startDate, endDate] = value;
  const [inputValue, setInputValue] = useState(formatRange(startDate, endDate));

  function formatRange(start, end) {
    if (!start && !end) return '';
    if (start && !end) return `${format(start, 'yyyy-MM-dd')} ~`;
    if (!start && end) return `~ ${format(end, 'yyyy-MM-dd')}`;
    return `${format(start, 'yyyy-MM-dd')} ~ ${format(end, 'yyyy-MM-dd')}`;
  }

  const handleInputChange = (e) => {
    const raw = e.target.value;
    setInputValue(raw);

    const [startStr, endStr] = raw.split('~').map((s) => s.trim());
    const start = parse(startStr, 'yyyy-MM-dd', new Date());
    const end = parse(endStr, 'yyyy-MM-dd', new Date());

    if (isValid(start) && isValid(end) && start <= end) {
      onChange([start, end]);
    }
  };

  const handleChange = (range) => {
    onChange(range);
    setInputValue(formatRange(range[0], range[1]));
  };

  const isValid = (d) => d instanceof Date && !isNaN(d);

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={handleChange}
      customInput={
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
          style={{
            padding: '8px 12px',
            width: '240px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      }
      dateFormat="yyyy-MM-dd"
      isClearable
      shouldCloseOnSelect={true}
    />
  );
}
