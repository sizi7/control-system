import { useState } from 'react';
import styles from './PasswordInput.module.css';

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder = '비밀번호를 입력하세요',
  disabled = false,
  ...props
}) {
  const [visible, setVisible] = useState(false);

  const showToggle = value && !disabled;

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={`
          ${styles.container}
          ${disabled ? styles.disabled : ''}
        `}
      >
        <input
          type={visible ? 'text' : 'password'}
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setVisible((prev) => !prev)}
            aria-label="비밀번호 표시 토글"
          >
            {visible ? (
              <img src="/imgs/icon-password-on.svg" alt="" />
            ) : (
              <img src="/imgs/icon-password-off.svg" alt="" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
