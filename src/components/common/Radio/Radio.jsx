import styles from './Radio.module.css'

export default function Radio({
  label,
  name,
  value,
  onChange,
  options = [],
  error = false,
  errorMessage = '',
}) {
  return (
    <div className={styles.wrapper}>
      {label && <p className={styles.groupLabel}>{label}</p>}
      <div className={`${styles.radioGroup} ${error ? styles.error : ''}`}>
        {options.map((opt) => (
          <label key={opt.value} className={styles.radioItem}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className={styles.radioInput}
            />
            <span className={styles.customRadio}></span>
            {opt.label}
          </label>
        ))}
      </div>
      {error && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
    </div>
  );
}