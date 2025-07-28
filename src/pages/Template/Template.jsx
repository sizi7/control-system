import { useEffect, useState } from 'react';
import styles from './Template.module.css';
import Input from '../../components/common/Input/Input';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import Radio from '../../components/common/Radio/Radio';
import { ToastProvider, useToast } from '../../components/common/Toast/Toast';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';
import CheckboxGroup from '../../components/common/Checkbox/CheckboxGroup';
import PasswordInput from '../../components/common/PasswordInput/PasswordInput';
import List from '../../components/common/List/List';
import Table from '../../components/common/Table/Table';
import PostListPage from '../../components/common/Table/PostListPage';
import BarChart from '../../components/common/Graph/BarGraph';
import Textarea from '@/components/common/Textarea/Textarea';
import MonthPicker from '@/components/common/DatePicker/MonthPicker';
import MonthRangePicker from '@/components/common/DatePicker/MonthRangePicker';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import DateRangePicker from '@/components/common/DatePicker/DateRangePicker';
import SingleDateRangePicker from '@/components/common/DatePicker/SingleDateRangePicker';
import MonthRangePickerSingle from '@/components/common/DatePicker/MonthRangePickerSingle';
import YearRangePickerSingle from '@/components/common/DatePicker/YearPicker';
import ExcelDownloadButton from '@/components/common/ExcelDownloadButton/ExcelDownloadButton';

const DefaultInput = () => {
  const [text, setText] = useState('');
  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
    // setError(value.length > 10); // 예시: 10글자 넘으면 에러
  };

  return (
    <Input
      // label="이름"
      name="inputName"
      value={text}
      onChange={handleInputChange}
      placeholder="이름을 입력하세요"
    />
  );
};

const DefaultPasswordInput = () => {
  const [password, setPassword] = useState('');
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return <PasswordInput value={password} onChange={handlePasswordChange} />;
};

const DefaultTextarea = () => {
  const [text, setText] = useState('');
  const [hasError, _] = useState(false);

  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="내용을 입력해주세요"
      rows={5}
      error={hasError}
      errorMessage="내용을 입력해주세요"
    />
  );
};

const DefaultSelectBox = () => {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [hasError, setHasError] = useState(false);

  const selectOptions = [
    { label: '사과', value: 'apple' },
    { label: '바나나', value: 'banana' },
    { label: '체리', value: 'cherry' },
  ];

  const handleSelectChange = (value) => {
    setSelectedFruit(value);
    setHasError(value === 'banana'); // 예시: 바나나는 에러로 간주
  };

  return (
    <SelectBox
      label="과일"
      value={selectedFruit}
      onChange={handleSelectChange}
      options={selectOptions}
      error={hasError}
      errorMessage="바나나는 선택할 수 없습니다"
    />
  );
};

const DefaultCheckbox = () => {
  const checkboxOptions = [
    { id: 'dev', label: '개발' },
    { id: 'design', label: '디자인' },
    { id: 'marketing', label: '마케팅' },
    { id: 'pm', label: '기획', disabled: true },
  ];
  const [selected, setSelected] = useState(['dev']);

  const checkboxhandleChange = (id, isChecked) => {
    setSelected((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  return (
    <CheckboxGroup
      options={checkboxOptions}
      values={selected}
      onChange={checkboxhandleChange}
    />
  );
};

const DefaultRadio = () => {
  const [gender, setGender] = useState('');
  const [error2, setError2] = useState(false);

  const genderOptions = [
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
    { label: '기타', value: 'other' },
  ];

  const handleRadioChange = (val) => {
    setGender(val);
    setError2(val === 'other'); // 예시: '기타' 선택 시 에러
  };

  return (
    <Radio
      label="성별"
      name="gender"
      value={gender}
      onChange={handleRadioChange}
      options={genderOptions}
      error={error2}
      errorMessage="기타는 선택할 수 없습니다"
    />
  );
};
// useState를 form Data로 한번에 관리할 때
// const handleSelectChange = (name, value) => {
//   setForm((prev) => ({ ...prev, [name]: value }));
//   console.log(`Selected ${name}: ${value}`);
// };
// <Radio
//   name="deviceCategory"
//   value={form.deviceCategory}
//   onChange={(value) => handleSelectChange('deviceCategory', value)}
//   options={deviceCategoryOptions}
// />;

const DefaultModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>모달 제목</h2>
        <p>이건 모달 내용입니다.</p>
        <div className="buttonGroup">
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            닫기
          </Button>
        </div>
      </Modal>
    </>
  );
};

const DefaultConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    // 확인 시 동작
    alert('확인 클릭됨');
    setIsOpen(false);
  };

  const handleCancel = () => {
    // 취소 시 동작
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>확인 모달 열기</Button>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <h2>정말 삭제하시겠습니까?</h2>
        <p>이 작업은 되돌릴 수 없습니다.</p>

        <div className="buttonGroup">
          <Button variant="red" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="blue" onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

const DefaultDatePicker = () => {
  const [date, setDate] = useState(null);
  return (
    <>
      <DatePicker value={date} onChange={setDate} />
    </>
  );
};
const DefaultDateRangePicker = () => {
  return (
    <>
      <DateRangePicker />
    </>
  );
};

const DefaultSingleDateRangePicker = () => {
  const formatRange = ([start, end]) => {
    const format = (date) =>
      date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        : '';
    return start && end ? `${format(start)} ~ ${format(end)}` : '';
  };
  const [range, setRange] = useState([null, null]);
  console.log('Selected range:', formatRange(range));
  return (
    <div>
      <h3>날짜 범위 선택 (한 번에)</h3>
      <SingleDateRangePicker value={range} onChange={setRange} />
    </div>
  );
};

const DefaultMonthPicker = () => {
  const [selectMonth, setSelectMonth] = useState(new Date());

  const formatMonth = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleChange = (date) => {
    setSelectMonth(date);
    console.log('선택된 월:', formatMonth(date));
  };
  return (
    <MonthPicker
      selected={selectMonth}
      onChange={handleChange}
      dateFormat="yyyy-MM"
      showMonthYearPicker
    />
  );
};

const DefaultMonthRangePicker = () => {
  const [range, setRange] = useState({ start: null, end: null });

  const formatMonth = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleChange = (range) => {
    setRange(range);

    const formatted =
      range.start && range.end
        ? `${formatMonth(range.start)} ~ ${formatMonth(range.end)}`
        : '';
    console.log('선택된 범위:', formatted);
  };

  const formattedRange =
    range.start && range.end
      ? `${formatMonth(range.start)} ~ ${formatMonth(range.end)}`
      : '';

  return (
    <div>
      <h3>월 범위 선택</h3>
      <MonthRangePicker value={range} onChange={handleChange} />
      {formattedRange && <p>선택된 범위: {formattedRange}</p>}
    </div>
  );
};

const DefaultMonthRangePickerSingle = () => {
  return <MonthRangePickerSingle />;
};
const DefaultYearRangePickerSingle = () => {
  return <YearRangePickerSingle />;
};

const DefaultList = () => {
  const items = [
    {
      id: 1,
      title: '공지사항 1',
      description: '내용입니다.',
      date: '2025-06-30',
    },
    {
      id: 2,
      title: '공지사항 2',
      description: '다른 내용입니다.',
      date: '2025-06-29',
    },
  ];

  return (
    <List items={items} renderItem={(user) => <strong>{user.name}</strong>} />
  );
};

const DefaultTable = () => {
  const columns = [
    { key: 'id', label: '번호' },
    { key: 'title', label: '제목' },
    { key: 'author', label: '작성자' },
    { key: 'date', label: '작성일' },
  ];

  const posts = [
    { id: 1, title: '첫 번째 글', author: '관리자', date: '2025-06-30' },
    { id: 2, title: '두 번째 글', author: '홍길동', date: '2025-06-29' },
  ];
  return <Table columns={columns} data={posts} />;
};

const DefaultBarGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 실제 API 연동 예:
    // fetch('/api/chart-data')
    //   .then((res) => res.json())
    //   .then((json) => setData(json));

    // 가데이터 예시
    setTimeout(() => {
      setData([
        { label: 'React', value: 40 },
        { label: 'Vue', value: 25 },
        { label: 'Angular', value: 15 },
        { label: 'Svelte', value: 20 },
        { label: 'React2', value: 40 },
        { label: 'Vue2', value: 25 },
        { label: 'Angular2', value: 15 },
        { label: 'Svelte2', value: 20 },
      ]);
    }, 500);
  }, []);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      {/* <h2>프레임워크 인기 차트</h2> */}
      <BarChart data={data} />
    </div>
  );
};

const DefaultExcelDownload = () => {
  const fileName = '기관 정보';
  const sheetName = '기관 정보';
  const data = [
    {
      organizationName: '한림대학교 춘천성심병원',
      organizationCode: 'HUMC_CC',
      measurementPeriod: '15일',
      deviceManagement: 'SEERS',
      deIdentification: '가운데',
      his: 'O',
    },
  ];

  const headers = [
    { key: 'No', label: 'No' },
    { key: 'organizationName', label: '기관명' },
    { key: 'organizationCode', label: '기관 코드' },
    { key: 'measurementPeriod', label: '측정 기간' },
    { key: 'deviceManagement', label: '장치 관리' },
    { key: 'deIdentification', label: '비식별화' },
    { key: 'his', label: 'HIS 연동 여부' },
  ];

  return (
    <ExcelDownloadButton
      data={data}
      headers={headers}
      fileName={fileName}
      sheetName={sheetName}
    />
  );
};

const Template = () => {
  return (
    <div className={styles.template}>
      <h1>Template</h1>

      <div>
        <h2>Input</h2>
        <DefaultInput />
      </div>

      <div>
        <h2>Password</h2>
        <DefaultPasswordInput />
      </div>

      <div>
        <h2>Textarea</h2>
        <DefaultTextarea />
      </div>

      <div>
        <h2>SelectBox</h2>
        <DefaultSelectBox />
      </div>

      <div>
        <h2>Checkbox</h2>
        <DefaultCheckbox />
      </div>

      <div>
        <h2>Radio</h2>
        <DefaultRadio />
      </div>

      <div>
        <h2>Toast</h2>
        <div>
          <ToastProvider>
            <DemoComponent />
          </ToastProvider>
        </div>
      </div>

      <div>
        <h2>Modal</h2>
        <div>
          <DefaultModal />
        </div>
        <div>
          <DefaultConfirmModal />
        </div>
      </div>

      <div>
        <h2>Button</h2>
        <div>
          <Button>기본 버튼</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">작은 버튼</Button>
          <Button size="lg">큰 버튼</Button>
          <Button disabled>비활성화</Button>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
              marginTop: '30px',
            }}
          >
            <Button variant="blue">아이콘</Button>
            <Button variant="red">delete</Button>
            <Button variant="blue" icon="confirm">
              아이콘
            </Button>
            <Button variant="red" icon="delete">
              delete
            </Button>
            <Button variant="blue" icon="confirm" iconOnly></Button>
            <Button variant="red" icon="delete" iconOnly></Button>
            <Button variant="blue" icon="confirm" iconOnly disabled></Button>
            <Button variant="red" icon="delete" iconOnly disabled></Button>

            <div>
              <Button variant="red" size="lg" icon="cancle">
                취소
              </Button>
              <Button variant="red-fill" size="lg" icon="finish">
                측정종료
              </Button>
              <Button variant="blue" size="lg" icon="confirm">
                등록 완료
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>DatePicker</h2>
        <DefaultDatePicker />
      </div>
      <div>
        <h2>DateRangePicker</h2>
        <DefaultDateRangePicker />
      </div>
      <div>
        <h2>SingleDateRangePicker</h2>
        <DefaultSingleDateRangePicker />
      </div>

      <div>
        <h2>MonthPicker</h2>
        <DefaultMonthPicker />
      </div>
      <div>
        <h2>MonthRangePicker</h2>
        <DefaultMonthRangePicker />
      </div>
      <div>
        <h2>SingleMonthRangePicker</h2>
        <DefaultMonthRangePickerSingle />
      </div>
      <div>
        <h2>YearRangePickerSingle</h2>
        <DefaultYearRangePickerSingle />
      </div>

      <div>
        <h2>List</h2>
        <DefaultList />
      </div>

      <div>
        <h2>Table</h2>
        <DefaultTable />
        <PostListPage />
      </div>

      <div>
        <h2>BarGraph</h2>
        <DefaultBarGraph />
      </div>

      <div>
        <h2>엑셀 다운로드</h2>
        <div>
          <DefaultExcelDownload />
        </div>
      </div>
    </div>
  );
};

export default Template;

// Toast
function DemoComponent() {
  const { showToast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '8px', padding: '2rem' }}>
      <Button
        variant="blue"
        onClick={() => showToast({ type: 'success', message: '성공!' })}
      >
        성공 토스트
      </Button>
      <Button
        variant="red"
        onClick={() => showToast({ type: 'error', message: '에러 발생!' })}
      >
        에러 토스트
      </Button>
    </div>
  );
}
