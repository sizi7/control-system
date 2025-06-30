import styles from './Button.module.css';
import classNames from 'classnames';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  ...props
}) {
  const btnClass = classNames(
    styles.button,
    styles[variant],
    styles[size],
    disabled || loading ? styles.disabled : ''
  );

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? '로딩 중...' : children}
    </button>
  );
}
