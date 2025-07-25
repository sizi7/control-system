import styles from './List.module.css';
import classNames from 'classnames';

export default function List({ items = [], renderItem, className }) {
  if (!items.length) return <p className={styles.empty}>데이터가 없습니다.</p>;

  return (
    <ul className={classNames(styles.list, className)}>
      {items.map((item, index) => (
        <li key={item.id || index} className={styles.item}>
          {renderItem ? (
            renderItem(item)
          ) : (
            <>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.description}>{item.description}</div>
              <div className={styles.meta}>{item.date}</div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
