import Table from '@/components/common/Table/Table';
import { useNavigate } from 'react-router-dom';

const DailyUsage = () => {
  const navigate = useNavigate();
  const columns = [
    // { key: 'id', label: '번호' },
    { key: 'baseDate', label: '일자', align: 'left', width: '40%' },
    { key: 'totalCount', label: '전체수량', align: 'center', width: '20%' },
    { key: 'ecgCount', label: '심전계', align: 'center', width: '20%' },
    { key: 'spo2Count', label: '산소포화도', align: 'center', width: '20%' },
  ];

  const posts = [
    {
      id: 202506,
      date: '2025-06-01',
      baseDate: '2025년 06월 01일',
      totalCount: 1,
      ecgCount: 1,
      spo2Count: 0,
    },
    {
      id: 202507,
      date: '2025-06-02',
      baseDate: '2025년 06월 02일',
      totalCount: 6,
      ecgCount: 6,
      spo2Count: 6,
    },
  ];
  const goToDailyDetailUsage = (row) => {
    navigate(`/usagestats/monthly/${row.date}`);
  };

  return (
    <section>
      <h3>일별 사용량</h3>
      <Table columns={columns} data={posts} onRowClick={goToDailyDetailUsage} />
    </section>
  );
};

export default DailyUsage;
