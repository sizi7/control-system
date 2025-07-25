import styles from './Textarea.module.css';

export default function Textarea({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  error = false,
  errorMessage = '',
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...props}
      />
      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}
