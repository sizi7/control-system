// MonthlyUsage.jsx

import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import Table from '@/components/common/Table/Table';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import DailyUsage from '@/components/UsageStats/DailyUsage';
import { useState } from 'react';

const MonthlyUsage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);

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
