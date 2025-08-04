import styles from './SearchInput.module.css';

export default function SearchInput({
  value,
  onChange,
  placeholder = '검색어를 입력하세요',
  error = false,
  errorMessage = '',
  ...props
}) {
  return (
    <div className={styles.inputWrapper}>
      <div className={`${styles.inputContainer} ${error ? styles.inputError : ''}`}>
        <input
          type="text"
          className={styles.searchInput}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          disabled={props.disabled}
          {...props}
        />
        {value && !props.disabled && (
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
