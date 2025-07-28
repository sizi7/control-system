import { useState } from 'react';
import tableStyles from '@/components/common/Table/Table.module.css';
import styles from './ContractForm.module.css';
import Input from '../common/Input/Input';
import SelectBox from '../common/SelectBox/SelectBox';
import SingleDateRangePicker from '../common/DatePicker/SingleDateRangePicker';
import Button from '../common/Button/Button';
import DatePicker from '../common/DatePicker/DatePicker';
import Textarea from '../common/Textarea/Textarea';

const ContractForm = ({ mode = 'create', initialData }) => {
  const formatRange = ([start, end]) => {
    const format = (date) =>
      date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        : '';
    return start && end ? `${format(start)} ~ ${format(end)}` : '';
  };
  const [demoRange, setDemoRange] = useState([null, null]);
  const [contractDate, setContractDate] = useState(null);
  const [installationDate, setInstallationDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.demoPeriod = formatRange(demoRange);
    // post or put depending on mode
    console.log('Form submitted:', form);
  };
  const [form, setForm] = useState({
    orgCode: '',
    department: '', // 진료과
    purchaseType: '', // 구매 종류
    decisionMaker: '', // 결정권자
    status: '', // 상태
    demoPeriod: '', // 데모기간 (예: '2주')
    contractDate: '', // 계약일 (날짜 문자열)
    installationDate: '', // 설치예정일 (날짜 문자열)
    contractWard: '', // 계약 병동
    contractBeds: '', // 계약 병상 수
    contractAmount: '', // 계약 금액
    competingProducts: '', // 보유 경쟁품
    ecgCount: '', // 심전계 계약 수량
    ppgCount: '', // 펄스옥시미터 계약 수량
    thermometerCount: '', // 체온계 계약 수량
    bpMonitorCount: '', // 혈압계 계약 수량
    etcInfo: '', // 기타정보
  });

  const purchaseTypes = [
    { label: '구매형', value: '구매형' },
    { label: '구독형', value: '구독형' },
  ];
  const StatusTypes = [
    { label: '제안', value: '제안' },
    { label: '계약', value: '계약' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // select / radio
  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log(`Selected ${name}: ${value}`);
  };

  const onChangeDemoRange = (range) => {
    setDemoRange(range);
    console.log('Demo range selected:', range);
  };

  return (
    <section className="mt-30">
      <form onSubmit={handleSubmit}>
        <table className={tableStyles.table}>
          <colgroup>
            <col width="10%" />
            <col width="40%" />
            <col width="10%" />
            <col width="40%" />
          </colgroup>
          <tbody>
            <tr>
              <th>기관</th>
              <td>씨어스</td>
              <th>진료과</th>
              <td>
                <Input
                  name="orgCode"
                  value={form.orgCode}
                  onChange={handleInputChange}
                  placeholder="진료과를 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>종류</th>
              <td>
                <SelectBox
                  value={form.purchaseType}
                  onChange={(value) =>
                    handleSelectChange('purchaseType', value)
                  }
                  options={purchaseTypes}
                />
              </td>
              <th>결정권자</th>
              <td>
                <Input
                  name="decisionMaker"
                  value={form.decisionMaker}
                  onChange={handleInputChange}
                  placeholder="결정권자를 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>상태</th>
              <td>
                <SelectBox
                  value={form.status}
                  onChange={(value) => handleSelectChange('status', value)}
                  options={StatusTypes}
                />
              </td>
              <th>데모기간</th>
              <td>
                <SingleDateRangePicker
                  value={demoRange}
                  onChange={onChangeDemoRange}
                />
              </td>
            </tr>
            <tr>
              <th>계약일</th>
              <td>
                <DatePicker value={contractDate} onChange={setContractDate} />
              </td>
              <th>설치 예정일</th>
              <td>
                <DatePicker
                  value={installationDate}
                  onChange={setInstallationDate}
                />
              </td>
            </tr>
            <tr>
              <th>계약 병동</th>
              <td>
                <Input
                  name="contractWard"
                  value={form.contractWard}
                  onChange={handleInputChange}
                  placeholder="계약시 병동 규모를 입력해주세요."
                />
              </td>
              <th>계약병상</th>
              <td>
                <Input
                  name="contractBeds"
                  value={form.contractBeds}
                  onChange={handleInputChange}
                  placeholder="계약시 병동 규모를 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>계약금액</th>
              <td>
                <Input
                  name="contractBeds"
                  value={form.contractBeds}
                  onChange={handleInputChange}
                  placeholder="계약 금액을 입력해주세요."
                />
              </td>
              <th>보유 경쟁품</th>
              <td>
                <Input
                  name="competingProducts"
                  value={form.competingProducts}
                  onChange={handleInputChange}
                  placeholder="보유 경쟁품을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>심전계</th>
              <td>
                <Input
                  name="ecgCount"
                  value={form.ecgCount}
                  onChange={handleInputChange}
                  placeholder="도입되는 심전계 수량을 입력해주세요."
                />
              </td>
              <th>펄스옥시미터</th>
              <td>
                <Input
                  name="ppgCount"
                  value={form.ppgCount}
                  onChange={handleInputChange}
                  placeholder="도입되는 펄스옥시미터 수량을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>체온계</th>
              <td>
                <Input
                  name="thermometerCount"
                  value={form.thermometerCount}
                  onChange={handleInputChange}
                  placeholder="도입되는 체온계 수량을 입력해주세요."
                />
              </td>
              <th>혈압계</th>
              <td>
                <Input
                  name="bpMonitorCount"
                  value={form.bpMonitorCount}
                  onChange={handleInputChange}
                  placeholder="도입되는 혈압계 수량을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>기타정보</th>
              <td colSpan={3}>
                <Textarea
                  name="extraInfo"
                  value={form.extraInfo}
                  onChange={handleInputChange}
                  placeholder="내용을 입력해주세요"
                  rows={5}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={styles.button}>
          <Button type="submit" variant="blue" size="lg">
            {mode === 'create' ? '등록' : '수정'}
          </Button>
          <Button variant="red" size="lg">
            취소
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContractForm;
