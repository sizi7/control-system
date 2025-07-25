import styles from './Button.module.css';
import classNames from 'classnames';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  icon,
  iconOnly = false,
  ...props
}) {
  const btnClass = classNames(styles.button, styles[variant], styles[size], {
    [styles.disabled]: disabled,
    [styles.icon]: icon,
    [styles[icon]]: icon, // icon 클래스 조건부
    [styles.iconOnly]: iconOnly, // ✅ 수정된 부분
  });

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
