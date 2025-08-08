import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@/components/common/Table/Table';
import { useEffect, useState } from 'react';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import ExcelDownloadButton from '@/components/common/ExcelDownloadButton/ExcelDownloadButton';
import api from '@/utils/api';

const columns = [
  { key: 'timeRange', label: '날짜', align: 'left', width: '20%' },
  { key: 'patientCode', label: '환자코드', align: 'center', width: '10%' },
  { key: 'name', label: '이름', align: 'center', width: '10%' },
  { key: 'ward', label: '병동', align: 'center', width: '10%' },
  { key: 'sickroom', label: '병실', align: 'center', width: '10%' },
  {
    key: 'ecgSerial',
    label: '심전계',
    align: 'center',
    width: '10%',
    render: (row) => (row.deviceType === '1' ? row.serialNumber : '-'),
  },
  {
    key: 'spo2Serial',
    label: '산소포화도',
    align: 'center',
    width: '10%',
    render: (row) => (row.deviceType === '3' ? row.serialNumber : '-'),
  },
];

const DailyDetailUsage = () => {
  const navigate = useNavigate();

  // const { day } = useParams();
  // console.log('day', day);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  // const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  // const keyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState('');
  const limit = 20;

  useEffect(() => {
    api
      .post(`/API/Premium/SelectServiceUseDetailInfoListPage`, {
        organizationCode: 'BELIEVE',
        searchText: keyword,
        offset: page,
        limit: limit,
      })
      .then((res) => {
        // console.log('res', res.data.premiumMeasurementInfoList);
        setPosts(res.data.premiumMeasurementInfoList);
        setTotal(res.data.totalCount);
      });
  }, [page, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    // const input = e.target.keyword.value;
    setSearchParams({ page: 1 });
  };

  const handleBack = () => {
    navigate(`/usagestats/`);
  };

  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="상세 사용량 통계" />
        <Breadcrumbs name="상세 사용량 통계" />
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Button onClick={handleBack}>← 뒤로가기</Button>
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            <div style={{ width: '300px' }}>
              <Input
                name="keyword"
                placeholder="검색어를 입력하세요"
                defaultValue={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <Button type="submit">검색</Button>
          </div>
        </div>
      </form>
      {keyword && posts.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <Table
          columns={columns}
          data={posts}
          totalItems={total}
          rowsPerPage={limit}
          currentPage={page}
          onPageChange={(p) => setSearchParams({ page: p })}
        />
      )}
      <ExcelDownloadButton
        data={posts}
        headers={columns}
        fileName="기관목록.xlsx"
      />
    </section>
  );
};

export default DailyDetailUsage;
