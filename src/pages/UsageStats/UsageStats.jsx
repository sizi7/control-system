import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/layout/PageTitle/PageTitle';
import { useNavigate } from 'react-router-dom';
import Table from '@/components/common/Table/Table';

const UsageStats = () => {
  const navigate = useNavigate();
  const columns = [
    { key: 'id', label: 'No.', width: '10%' },
    { key: 'HospitalName', label: '병원명', width: '90%' },
  ];

  const posts = [
    { key: 1, id: 1, HospitalName: '데이터용기본기관' },
    { key: 2, id: 2, HospitalName: '데이터용기본기관2' },
  ];

  const goToMonthlyUsage = () => {
    navigate(`/usagestats/monthly`);
  };

  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="사용량 통계(병원 목록)" />
        <Breadcrumbs name="사용량 통계" />
      </div>
      <section>
        <Table columns={columns} data={posts} onRowClick={goToMonthlyUsage} />
      </section>
    </section>
  );
};

export default UsageStats;
