import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './DateRangeInput.module.css';

export default function DateRangeInput({ value = [null, null], onChange }) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [range, setRange] = useState([
    {
      startDate: value[0] || new Date(),
      endDate: value[1] || new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    setRange([{ startDate: value[0], endDate: value[1], key: 'selection' }]);
  }, [value]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    console.log('startDate', startDate);
    console.log('endDate', endDate);
    setRange([ranges.selection]);
    onChange([startDate, endDate]); // 부모로 전달
    setOpen(false);
  };

  const formatDate = (date) =>
    date instanceof Date && !isNaN(date) ? format(date, 'yyyy-MM-dd') : '';

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        readOnly
        value={`${formatDate(range[0].startDate)} ~ ${formatDate(range[0].endDate)}`}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className={styles.popover}>
          <DateRange
            ranges={range}
            onChange={handleSelect}
            editableDateInputs
            moveRangeOnFirstSelection={false} // ✅ 이거 꼭 있어야 함
            locale={ko}
            dateDisplayFormat="yyyy-MM-dd"
            showSelectionPreview={true}
            months={1}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
}
