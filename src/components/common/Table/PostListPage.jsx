import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Table from './Table';

const columns = [
  { key: 'id', label: '번호' },
  { key: 'title', label: '제목' },
  { key: 'author', label: '작성자' },
  { key: 'date', label: '작성일' },
];

const MOCK_DATA = [
  { id: 1, title: 'React란?', author: '관리자', date: '2025-06-30' },
  {
    id: 2,
    title: 'useEffect 제대로 쓰기',
    author: '홍길동',
    date: '2025-06-29',
  },
  { id: 3, title: 'JavaScript Tips', author: '김철수', date: '2025-06-28' },
  {
    id: 4,
    title: '프로젝트 디렉토리 구조',
    author: '이영희',
    date: '2025-06-27',
  },
  { id: 5, title: 'React Router v6', author: '관리자', date: '2025-06-26' },
  {
    id: 6,
    title: '비동기 처리와 async/await',
    author: '홍길동',
    date: '2025-06-25',
  },
  {
    id: 7,
    title: 'CSS 모듈 vs Styled Components',
    author: '김철수',
    date: '2025-06-24',
  },
  { id: 8, title: 'Form 상태관리', author: '이영희', date: '2025-06-23' },
  {
    id: 9,
    title: '컴포넌트 재사용 전략',
    author: '관리자',
    date: '2025-06-22',
  },
  { id: 10, title: '리렌더링 최적화', author: '홍길동', date: '2025-06-21' },
  {
    id: 11,
    title: 'React Query로 서버 관리하기',
    author: '김철수',
    date: '2025-06-20',
  },
  // ... 더 추가 가능
];

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page') || 1);
  const keyword = searchParams.get('keyword') || '';
  const limit = 5;

  useEffect(() => {
    // API 미연결 상태: 목데이터 사용
    const filtered = MOCK_DATA.filter(
      (item) => item.title.includes(keyword) || item.author.includes(keyword)
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

  return (
    <div>
      <h1>게시글 목록</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          name="keyword"
          placeholder="검색어를 입력하세요"
          defaultValue={keyword}
        />
        <button type="submit">검색</button>
      </form>

      <Table
        columns={columns}
        data={posts}
        totalItems={total}
        rowsPerPage={limit}
        currentPage={page}
        onPageChange={(p) => setSearchParams({ page: p, keyword })}
        onRowClick={(row) => navigate(`/posts/${row.id}`)}
      />
    </div>
  );
}
