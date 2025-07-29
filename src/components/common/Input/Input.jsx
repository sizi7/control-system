import styles from './Input.module.css';

export default function Input({
  label,
  value,
  onChange,
  placeholder = '',
  error = false,
  errorMessage = '',
  ...props
}) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <div className={`${styles.inputContainer} ${error ? 'inputError' : ''}`}>
        <input
          className={styles.customInput}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() =>
              onChange({ target: { name: props.name, value: '' } })
            }
          >
            ×
          </button>
        )}
      </div>
      {error && errorMessage && (
        <p className={styles.inputErrorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
