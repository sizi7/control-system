import Button from '@/components/common/Button/Button';
import styles from './Organization.module.css';

import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import { useNavigate } from 'react-router-dom';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { useState } from 'react';
import Radio from '@/components/common/Radio/Radio';
import Input from '@/components/common/Input/Input';
import Table from '@/components/common/Table/Table';
import ExcelDownloadButtonCustom from '@/components/common/ExcelDownloadButton/ExcelDownloadButtonCustom';

const Hospital = () => {
  const navigate = useNavigate();
  const goToOrganizationNew = () => {
    navigate('/organization/new');
  };
  const goToContractNew = (id) => {
    console.log(id);
    navigate(`/organization/:${id}/contract/new`);
  };

  const [selectedStatus, setSelectedStatus] = useState('전체');

  // 상태 selectbox
  const selectOptions = [
    { label: '전체', value: '전체' },
    { label: '대기', value: '대기' },
    { label: '제안', value: '제안' },
    { label: '설명회', value: '설명회' },
    { label: '데모', value: '데모' },
    { label: '실측', value: '실측' },
    { label: '견적', value: '견적' },
    { label: '계약', value: '계약' },
    { label: '설치', value: '설치' },
    { label: '완료', value: '완료' },
  ];

  const handleSelectChange = (value) => {
    setSelectedStatus(value);
  };

  // 활성화 radio
  const [activationStatus, setActivationStatus] = useState('activation');

  const activationOptions = [
    { label: '활성화', value: 'activation' },
    { label: '비활성화', value: 'deactivation' },
  ];

  const handleRadioChange = (value) => {
    setActivationStatus(value);
  };

  // 검색어 input
  const [search, setSearch] = useState('');
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  // 목록 table
  const columns = [
    // { key: 'id', label: '번호' },
    { key: 'organizationName', label: '기관명', align: 'left', width: '30%' },
    { key: 'organizationCode', label: '코드', align: 'center', width: '100px' },
    {
      key: 'measurementPeriod',
      label: '최대 측정 일 수',
      align: 'center',
      width: '100px',
    },
    {
      key: 'deviceManagement',
      label: '장치관리',
      align: 'center',
      width: '100px',
    },
    {
      key: 'deIdentification',
      label: '비식별화',
      align: 'center',
      width: '100px',
    },
    { key: 'his', label: 'HIS', align: 'center', width: '100px' },
  ];

  const posts = [
    {
      key: 1,
      organizationName: '한림대학교 춘천성심병원',
      organizationCode: 'HUMC_CC',
      measurementPeriod: '15일',
      deviceManagement: 'SEERS',
      deIdentification: '가운데',
      his: 'O',
    },
    {
      key: 2,
      organizationName: '강릉아산병원',
      organizationCode: 'gramc',
      measurementPeriod: '15일',
      deviceManagement: 'SEERS',
      deIdentification: '마지막',
      his: 'O',
    },
    {
      key: 3,
      organizationName: '이대서울병원',
      organizationCode: 'EUHS',
      measurementPeriod: '30일',
      deviceManagement: '병원',
      deIdentification: '없음',
      his: 'X',
    },
  ];

  const handleOrgDetail = (id) => {
    navigate(`/organization/${id}`);
  };

  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="기관" />
        <Breadcrumbs name="기관" />
      </div>
      <div className={styles.buttonBox}>
        <Button variant="blue" onClick={goToOrganizationNew}>
          기관 등록
        </Button>
        <Button variant="blue" onClick={() => goToContractNew(1)}>
          계약 등록
        </Button>
        <ExcelDownloadButtonCustom data={posts} fileName="기관목록.xlsx" />
      </div>
      <div className={styles.search}>
        <table>
          <tbody>
            <tr>
              <th>상태</th>
              <td>
                <div className={styles.selectbox}>
                  <SelectBox
                    value={selectedStatus}
                    onChange={handleSelectChange}
                    options={selectOptions}
                  />
                </div>
              </td>
              <th>활성화</th>
              <td>
                <div className={styles.radiobox}>
                  <Radio
                    name="activation"
                    value={activationStatus}
                    onChange={handleRadioChange}
                    options={activationOptions}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>검색어</th>
              <td colSpan={3}>
                <div className={styles.searchbox}>
                  <div className={styles.searchInput}>
                    <Input
                      value={search}
                      onChange={handleSearchChange}
                      placeholder="검색어를 입력하세요"
                    />
                  </div>
                  <Button
                    variant="blue"
                    // onClick={onClick}
                  >
                    검색
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.tablebox}>
        <Table columns={columns} data={posts} onRowClick={handleOrgDetail} />
      </div>
    </section>
  );
};

export default Hospital;
