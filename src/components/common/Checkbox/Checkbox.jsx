import styles from './Checkbox.module.css';

const Checkbox = ({ id, label, checked, onChange, disabled = false }) => {
  return (
    <label className={`${styles.checkbox} ${disabled ? styles.disabled : ''}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className={styles.checkmark} />
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
