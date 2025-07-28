import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import ContractForm from '@/components/Organization/ContractForm';

const ContractNew = () => {
  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="계약 정보 등록" />
        <Breadcrumbs name="계약 정보 등록" />
      </div>
      <div>
        <ContractForm mode="create" />
      </div>
    </section>
  );
};

export default ContractNew;
