// MonthlyUsage.jsx

import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import Table from '@/components/common/Table/Table';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import DailyUsage from '@/components/UsageStats/DailyUsage';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const columns = [
  // { key: 'id', label: '번호' },
  { key: 'baseMonth', label: '연월', align: 'left', width: '40%' },
  { key: 'totalCount', label: '전체수량', align: 'center', width: '20%' },
  { key: 'ecgCount', label: '심전계', align: 'center', width: '20%' },
  { key: 'spo2Count', label: '산소포화도', align: 'center', width: '20%' },
];

const posts = [
  {
    id: 202506,
    month: '2025-06',
    baseMonth: '2025년 06월',
    totalCount: 34,
    ecgCount: 34,
    spo2Count: 30,
  },
  {
    id: 202507,
    month: '2025-07',
    baseMonth: '2025년 07월',
    totalCount: 30,
    ecgCount: 30,
    spo2Count: 22,
  },
];

const formatMonthKorean = (date) => {
  if (!date) return '';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

const MonthlyUsage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
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

  const goToDailyUsage = (row) => {
    setSelectedMonth(row.month);
    console.log('selectedMonth', selectedMonth);
  };

  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="월별 사용량 통계" />
        <Breadcrumbs name="월별 사용량 통계" />
      </div>
      <section>
        <div style={{ margin: '20px 0', border: '1px solid red' }}>
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
            className="datepickerInput"
            calendarClassName="customCalendar"
          />

          {/* {start && end && (
            <p>
              선택된 월 범위: {formatMonthKorean(start)} ~{' '}
              {formatMonthKorean(end)}
            </p>
          )} */}
        </div>
        <Table
          columns={columns}
          data={posts}
          onRowClick={(row) => goToDailyUsage(row)}
        />
      </section>
      {selectedMonth && <DailyUsage />}
    </section>
  );
};

export default MonthlyUsage;
