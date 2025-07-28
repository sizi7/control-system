import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '../PageTitle/PageTitle';

const UsageStats = () => {
  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="사용량 통계" />
        <Breadcrumbs name="사용량 통계" />
      </div>
    </section>
  );
};

export default UsageStats;
