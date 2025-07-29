import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Table from '@/components/common/Table/Table';
import { useEffect, useState } from 'react';
import PageTitle from '@/components/layout/PageTitle/PageTitle';
import Breadcrumbs from '@/components/common/Layout/Breadcrumbs/Breadcrumbs';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';

const columns = [
  // { key: 'id', label: '번호' },
  { key: 'date', label: '날짜', align: 'left', width: '10%' },
  { key: 'patientCode', label: '환자코드', align: 'center', width: '10%' },
  { key: 'patientName', label: '이름', align: 'center', width: '10%' },
  { key: 'ward', label: '병동', align: 'center', width: '10%' },
  { key: 'room', label: '병실', align: 'center', width: '10%' },
  { key: 'startTime', label: '시작시간', align: 'center', width: '15%' },
  { key: 'endTime', label: '종료시간', align: 'center', width: '15%' },
  { key: 'ecgSerial', label: '심전계', align: 'center', width: '10%' },
  { key: 'spo2Serial', label: '산소포화도', align: 'center', width: '10%' },
];

const MOCK_DATA = [
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0001',
    patientName: '김환자',
    ward: '1404',
    room: '01',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090911',
    spo2Serial: 'P090911',
  },
  {
    date: '2025-06-01',
    patientCode: 'A0002',
    patientName: '이환자',
    ward: '1404',
    room: '02',
    startTime: '2025-06-18 16:21:01',
    endTime: '	2025-06-18 16:25:29',
    ecgSerial: 'A090912',
    spo2Serial: 'P090912',
  },
];

const DailyDetailUsage = () => {
  const navigate = useNavigate();
  // console.log(MOCK_DATA.length);

  const { day } = useParams();
  console.log('day', day);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('keyword') || '';
  const limit = 10;

  useEffect(() => {
    // API 미연결 상태: 목데이터 사용
    const filtered = MOCK_DATA.filter(
      (item) =>
        item.patientName.includes(keyword) || item.author.includes(keyword)
    );
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

  const handleBack = () => {
    navigate(-1); // ✅ 브라우저 히스토리에서 한 단계 뒤로
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
              />
            </div>
            <Button type="submit">검색</Button>
          </div>
        </div>
      </form>

      <Table
        columns={columns}
        data={posts}
        totalItems={total}
        rowsPerPage={limit}
        currentPage={page}
        onPageChange={(p) => setSearchParams({ page: p, keyword })}
      />
    </section>
  );
};

export default DailyDetailUsage;
