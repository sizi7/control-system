import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import PageTitle from '../../components/layout/PageTitle/PageTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from '@/components/common/Table/Table';
import { useEffect, useState } from 'react';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';

const columns = [
  { key: 'id', label: 'No.', width: '10%' },
  { key: 'HospitalName', label: '병원명', width: '90%' },
];

const MOCK_DATA = [
  { key: 1, id: 1, HospitalName: '데이터용기본기관' },
  { key: 2, id: 2, HospitalName: '데이터용기본기관2' },
];

const UsageStats = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('keyword') || '';
  const limit = 10;

  useEffect(() => {
    // API 미연결 상태: 목데이터 사용
    const filtered = MOCK_DATA.filter(
      (item) => item.HospitalName.includes(keyword)
      //  || item.author.includes(keyword)
    );
    setFilteredData(filtered);
    setPosts(filtered.slice((page - 1) * limit, page * limit));
    setTotal(filtered.length);

    // 실제 API 사용 시:
    /*
      axios.get(`/api/posts?page=${page}&limit=${limit}&keyword=${keyword}`)
        .then((res) => {
          setPosts(res.data.data);
          setTotal(res.data.total);
        });
      */
  }, [page, keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.keyword.value;
    setSearchParams({ page: 1, keyword: input });
  };

  const goToMonthlyUsage = () => {
    navigate(`/usagestats/monthly`);
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
            justifyContent: 'space-between',
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
              />
            </div>
            <Button type="submit">검색</Button>
          </div>
        </div>
      </form>
      <section>
        {keyword && filteredData.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <Table
            columns={columns}
            data={posts}
            totalItems={total}
            rowsPerPage={limit}
            currentPage={page}
            onPageChange={(p) => setSearchParams({ page: p, keyword })}
            onRowClick={goToMonthlyUsage}
          />
        )}
      </section>
    </section>
  );
};

export default UsageStats;
