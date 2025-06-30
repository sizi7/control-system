import { useState } from "react";
import styles from "./Template.module.css";
import Input from "../../components/common/Input/Input";
import SelectBox from "../../components/common/SelectBox/SelectBox";
import Radio from "../../components/common/Radio/Radio";
import { ToastProvider, useToast } from "../../components/common/Toast/Toast";
import Modal from "../../components/common/Modal/Modal";
import Button from "../../components/common/Button/Button";
import CheckboxGroup from "../../components/common/Checkbox/CheckboxGroup";

const Template = () => {
  // Input
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setError(value.length > 10); // 예시: 10글자 넘으면 에러
  };

  // SelectBox
  const [selectedFruit, setSelectedFruit] = useState("");
  const [hasError, setHasError] = useState(false);

  const selectOptions = [
    { label: "사과", value: "apple" },
    { label: "바나나", value: "banana" },
    { label: "체리", value: "cherry" },
  ];

  const handleSelectChange = (value) => {
    setSelectedFruit(value);
    setHasError(value === "banana"); // 예시: 바나나는 에러로 간주
  };

  // Checkbox
  const checkboxOptions = [
    { id: "dev", label: "개발" },
    { id: "design", label: "디자인" },
    { id: "marketing", label: "마케팅" },
    { id: "pm", label: "기획", disabled: true },
  ];

  const [selected, setSelected] = useState(["dev"]);

  const checkboxhandleChange = (id, isChecked) => {
    setSelected((prev) =>
      isChecked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  // Radio
  const [gender, setGender] = useState("");
  const [error2, setError2] = useState(false);

  const genderOptions = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
    { label: "기타", value: "other" },
  ];

  const handleRadioChange = (val) => {
    setGender(val);
    setError2(val === "other"); // 예시: '기타' 선택 시 에러
  };

  // Modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.template}>
      <h1>Template</h1>

      <div>
        <h2>Input</h2>
        <Input
          label="이름"
          value={text}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
          error={error}
          errorMessage="10자를 넘을 수 없습니다."
        />
      </div>

      <div>
        <h2>SelectBox</h2>
        <SelectBox
          label="과일"
          value={selectedFruit}
          onChange={handleSelectChange}
          options={selectOptions}
          error={hasError}
          errorMessage="바나나는 선택할 수 없습니다"
        />
      </div>

      <div>
        <h2>Checkbox</h2>
        <CheckboxGroup
          options={checkboxOptions}
          values={selected}
          onChange={checkboxhandleChange}
        />
      </div>

      <div>
        <h2>Radio</h2>
        <Radio
          label="성별"
          name="gender"
          value={gender}
          onChange={handleRadioChange}
          options={genderOptions}
          error={error2}
          errorMessage="기타는 선택할 수 없습니다"
        />
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
        <button onClick={() => setIsOpen(true)}>모달 열기</button>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2>모달 제목</h2>
          <p>이건 모달 내용입니다.</p>
          <button onClick={() => setIsOpen(false)}>닫기</button>
        </Modal>
      </div>

      <div>Button</div>
      <Button>기본 버튼</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>

      <Button size="sm">작은 버튼</Button>
      <Button size="lg">큰 버튼</Button>

      <Button disabled>비활성화</Button>
      <Button loading>로딩 중</Button>
    </div>
  );
};

export default Template;

// Toast
function DemoComponent() {
  const { showToast } = useToast();

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => showToast({ type: "success", message: "성공!" })}>
        성공 토스트
      </button>
      <button
        onClick={() => showToast({ type: "error", message: "에러 발생!" })}
      >
        에러 토스트
      </button>
    </div>
  );
}
