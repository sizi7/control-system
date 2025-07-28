import PageTitle from '@/components/layout/PageTitle/PageTitle';
// import styles from './OrganizationDetail.module.css';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';

const OrganizationDetail = () => {
  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="기관 상세" />
        <Breadcrumbs name="기관 상세" />
      </div>
    </section>
  );
};

export default OrganizationDetail;
