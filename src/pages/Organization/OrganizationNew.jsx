import PageTitle from '@/components/layout/PageTitle/PageTitle';
// import styles from './OrganizationNew.module.css';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import OrganizationForm from '@/components/Organization/OrganizationForm';

const OrganizationNew = () => {
  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="기관 등록" />
        <Breadcrumbs name="기관 등록" />
      </div>
      <div>
        <OrganizationForm mode="create" />
      </div>
    </section>
  );
};

export default OrganizationNew;
