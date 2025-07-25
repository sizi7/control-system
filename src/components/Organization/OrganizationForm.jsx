import tableStyles from '@/components/common/Table/Table.module.css';
// import styles from './OrganizationForm.module.css';
import Input from '../common/Input/Input';
import { useState } from 'react';
import SelectBox from '../common/SelectBox/SelectBox';
import Radio from '../common/Radio/Radio';

export default function OrganizationForm({ mode = 'create', initialData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // post or put depending on mode
  };

  // 기관 코드 input
  const [orgCode, setOrgCode] = useState('');
  const handleOrgCodeChange = (e) => {
    const value = e.target.value;
    setOrgCode(value);
  };

  // 기관 이름 input
  const [orgName, setOrgName] = useState('');
  const handleOrgNameChange = (e) => {
    const value = e.target.value;
    setOrgName(value);
  };

  // 구분 selectbox
  const [selectedHospitalType, setSelectedHospitalType] = useState('종합병원');

  const hospitalTypes = [{ label: '종합병원', value: '종합병원' }];

  const handleHospitalTypeChange = (value) => {
    setSelectedHospitalType(value);
  };

  // 도입결정권자 input
  const [orgDecisionMaker, setOrgDecisionMaker] = useState();
  const handleOrgDecisionMakerChange = (e) => {
    const value = e.target.value;
    setOrgDecisionMaker(value);
  };

  // HIS 연동 radio
  const [isIntegrated, setIsIntegrated] = useState('unlinked');
  const integrationOptions = [
    { value: 'unlinked', label: '비연동' },
    { value: 'linked', label: '연동' },
  ];
  const handleLinkedChange = (value) => {
    setIsIntegrated(value);
  };

  // 장치관리구분 radio
  const [deviceCategory, setDeviceCategory] = useState('seers');
  const deviceCategoryOptions = [
    { value: 'seers', label: 'SEERS 관리' },
    { value: 'org', label: '병원 관리' },
  ];
  const handleDeviceCategoryChange = (e) => {
    setDeviceCategory(e.target.value);
  };

  // 최대 측정 일 수 input
  const [maxMeasurementDays, setMaxMeasurementDays] = useState('');
  const handleMaxMeasurementDaysChange = (e) => {
    setMaxMeasurementDays(e.target.value);
  };

  // 비식별화 radio
  const [deidentificationOption, setDeidentificationOption] =
    useState('middle');
  const deidentificationOptions = [
    { value: 'middle', label: '가운데' },
    { value: 'last', label: '마지막' },
    { value: 'none', label: '없음' },
  ];
  const handleDeidentificationChange = (e) => {
    setDeidentificationOption(e.target.value);
  };

  // 담당자 이메일 input
  const [managerEmail, setManagerEmail] = useState('');
  const handleManagerEmailChange = (e) => {
    setManagerEmail(e.target.value);
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
          <tr>
            <th>코드</th>
            <td>
              <Input
                value={orgCode}
                onChange={handleOrgCodeChange}
                placeholder="기관 고유 코드를 입력해주세요."
              />
            </td>
            <th>이름</th>
            <td>
              <Input
                value={orgName}
                onChange={handleOrgNameChange}
                placeholder="이름을 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>구분</th>
            <td>
              <div>
                <SelectBox
                  value={selectedHospitalType}
                  onChange={handleHospitalTypeChange}
                  options={hospitalTypes}
                />
              </div>
            </td>
            <th>도입결정권자</th>
            <td>
              <Input
                value={orgDecisionMaker}
                onChange={handleOrgDecisionMakerChange}
                placeholder="도입결정권자를 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>우편번호</th>
            <td></td>
            <th>주소</th>
            <td></td>
          </tr>
          <tr>
            <th>위도(x)</th>
            <td></td>
            <th>경도(y)</th>
            <td></td>
          </tr>
          <tr>
            <th>HIS 연동</th>
            <td>
              <Radio
                name="integrate"
                value={isIntegrated}
                onChange={handleLinkedChange}
                options={integrationOptions}
              />
            </td>
            <th>장치관리구분</th>
            <td>
              <Radio
                name="deviceCategory"
                value={deviceCategory}
                onChange={handleDeviceCategoryChange}
                options={deviceCategoryOptions}
              />
            </td>
          </tr>
          <tr>
            <th>최대 측정 일 수</th>
            <td>
              <Input
                value={maxMeasurementDays}
                onChange={handleMaxMeasurementDaysChange}
                placeholder="미 입력 시 15일로 처리됩니다."
              />
            </td>
            <th>비식별화</th>
            <td>
              <Radio
                name="deidentification"
                value={deidentificationOption}
                onChange={handleDeidentificationChange}
                options={deidentificationOptions}
              />
            </td>
          </tr>
          <tr>
            <th>담당자 이메일</th>
            <td colSpan={3}>
              <Input
                value={managerEmail}
                onChange={handleManagerEmailChange}
                placeholder="담당자의 이메일를 입력해주세요."
              />
            </td>
          </tr>
          <tr>
            <th>기타정보</th>
            <td colSpan={3}></td>
          </tr>
        </table>

        <button type="submit">{mode === 'create' ? '등록' : '수정'}</button>
      </form>
    </section>
  );
}
