import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ isOpen, onClose, children, width, height }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalStyle = {
    width: width || '500px', // 기본값
    height: height || 'auto',
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <div className={styles.modalChildren}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
