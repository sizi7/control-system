import tableStyles from '@/components/common/Table/Table.module.css';
import styles from './OrganizationForm.module.css';
import Input from '../common/Input/Input';
import { useState } from 'react';
import SelectBox from '../common/SelectBox/SelectBox';
import Radio from '../common/Radio/Radio';
import Textarea from '../common/Textarea/Textarea';
import Button from '../common/Button/Button';

export default function OrganizationForm({ mode = 'create', initialData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // post or put depending on mode
    console.log('Form submitted:', form);
  };

  const [form, setForm] = useState({
    orgCode: '',
    orgName: '',
    selectedHospitalType: '종합병원',
    orgDecisionMaker: '',
    isIntegrated: 'linked',
    deviceCategory: 'seers',
    maxMeasurementDays: '',
    deidentificationOption: 'middle',
    managerEmail: '',
    extraInfo: '',
  });

  const hospitalTypes = [
    { label: '종합병원', value: '종합병원' },
    { label: '2차병원', value: '2차병원' },
    { label: '요양병원', value: '요양병원' },
  ];

  const integrationOptions = [
    { value: 'unlinked', label: '비연동' },
    { value: 'linked', label: '연동' },
  ];

  const deviceCategoryOptions = [
    { value: 'seers', label: 'SEERS 관리' },
    { value: 'org', label: '병원 관리' },
  ];

  const deidentificationOptions = [
    { value: 'middle', label: '가운데' },
    { value: 'last', label: '마지막' },
    { value: 'none', label: '없음' },
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
              <th>코드</th>
              <td>
                <Input
                  name="orgCode"
                  value={form.orgCode}
                  onChange={handleInputChange}
                  placeholder="기관 고유 코드를 입력해주세요."
                />
              </td>
              <th>이름</th>
              <td>
                <Input
                  name="orgName"
                  value={form.orgName}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>구분</th>
              <td>
                <div>
                  <SelectBox
                    value={form.selectedHospitalType}
                    onChange={(value) =>
                      handleSelectChange('selectedHospitalType', value)
                    }
                    options={hospitalTypes}
                  />
                </div>
              </td>
              <th>도입결정권자</th>
              <td>
                <Input
                  name="orgDecisionMaker"
                  value={form.orgDecisionMaker}
                  onChange={handleInputChange}
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
                  name="isIntegrated"
                  value={form.isIntegrated}
                  onChange={(value) =>
                    handleSelectChange('isIntegrated', value)
                  }
                  options={integrationOptions}
                />
              </td>
              <th>장치관리구분</th>
              <td>
                <Radio
                  name="deviceCategory"
                  value={form.deviceCategory}
                  onChange={(value) =>
                    handleSelectChange('deviceCategory', value)
                  }
                  options={deviceCategoryOptions}
                />
              </td>
            </tr>
            <tr>
              <th>최대 측정 일 수</th>
              <td>
                <Input
                  name="maxMeasurementDays"
                  value={form.maxMeasurementDays}
                  onChange={handleInputChange}
                  placeholder="미 입력 시 15일로 처리됩니다."
                />
              </td>
              <th>비식별화</th>
              <td>
                <Radio
                  name="deidentification"
                  value={form.deidentificationOption}
                  onChange={(value) =>
                    handleSelectChange('deidentificationOption', value)
                  }
                  options={deidentificationOptions}
                />
              </td>
            </tr>
            <tr>
              <th>담당자 이메일</th>
              <td colSpan={3}>
                <Input
                  name="managerEmail"
                  value={form.managerEmail}
                  onChange={handleInputChange}
                  placeholder="담당자의 이메일를 입력해주세요."
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
}
