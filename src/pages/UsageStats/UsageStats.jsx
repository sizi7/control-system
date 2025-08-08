import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/layout/PageTitle/PageTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@/components/common/Table/Table';
import { useEffect, useState } from 'react';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import api from '@/utils/api';

const columns = [
  { key: 'organizationCode', label: 'No.', width: '10%' },
  { key: 'organizationName', label: '병원', width: '30%' },
  { key: 'serviceTotalCount', label: '전체', width: '10%' },
  { key: 'normalServiceCount', label: '일반 건수', width: '10%' },
  { key: 'premiumServiceCount', label: '사용량 비례 건수', width: '10%' },
  { key: 'ecgServiceCount', label: '심전계 검사 건수', width: '10%' },
  { key: 'spo2ServiceCount', label: '산소포화도 검사 건수', width: '10%' },
];

const MOCK_DATA = [
  { key: 1, id: 1, HospitalName: '데이터용기본기관' },
  { key: 2, id: 2, HospitalName: '데이터용기본기관2' },
];

const UsageStats = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  // const keyword = searchParams.get('keyword') || '';
  const [keyword, setKeyword] = useState('');
  const limit = 20;

  useEffect(() => {
    api
      .post(
        `/API/Premium/SelectServiceUseInfoPage`,
        {
          searchText: keyword,
          offset: page,
          limit: limit,
        }
        // {
        //   withCredentials: true,
        // }
      )
      .then((res) => {
        setPosts(res.data.serviceUseInfoList);
        setTotal(res.data.totalCount);
      });
  }, [page, keyword]);
  console.log('posts', posts);

  const handleSearch = (e) => {
    e.preventDefault();
    // const input = e.target.keyword.value;
    setSearchParams({ page: 1 });
  };

  const goToMonthlyUsage = (organizationCode) => {
    navigate(`/usagestats/monthly/${organizationCode}`);
  };

  return (
    <section>
      <div className="pageHeader">
        <PageTitle title="사용량 통계(병원 목록)" />
        <Breadcrumbs name="사용량 통계" />
      </div>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            gap: '8px',
          }}
        >
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
      <section>
        {keyword && posts.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <Table
            columns={columns}
            data={posts}
            totalItems={total}
            rowsPerPage={limit}
            currentPage={page}
            onPageChange={(p) => setSearchParams({ page: p, keyword })}
            onRowClick={(row) => goToMonthlyUsage(row.organizationCode)}
          />
        )}
      </section>
    </section>
  );
};

export default UsageStats;
