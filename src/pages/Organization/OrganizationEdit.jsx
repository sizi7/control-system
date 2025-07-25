import PageTitle from '@/components/layout/PageTitle/PageTitle';
import styles from './OrganizationEdit.module.css';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import OrganizationForm from '@/components/Organization/OrganizationForm';

const OrganizationEdit = () => {
  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="기관 수정" />
        <Breadcrumbs />
      </div>
      <div>
        <OrganizationForm mode="edit" />
      </div>
    </section>
  );
};

export default OrganizationEdit;
