import styles from './Table.module.css';
import classNames from 'classnames';
import { useState } from 'react';

export default function Table({
  columns = [],
  data = [],
  totalItems = 0,
  rowsPerPage = 10,
  currentPage = 1,
  onPageChange,
  onRowClick,
}) {
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(totalItems / rowsPerPage);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={classNames(styles.sortable, {
                  [styles.alignLeft]: col.align === 'left',
                  [styles.alignCenter]: col.align === 'center',
                  [styles.alignRight]: col.align === 'right',
                })}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.label}
                {sortConfig?.key === col.key &&
                  (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id || rowIndex}
              onClick={() => onRowClick?.(row.key)}
              className={onRowClick ? styles.clickableRow : ''}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={classNames({
                    [styles.alignLeft]: col.align === 'left',
                    [styles.alignCenter]: col.align === 'center',
                    [styles.alignRight]: col.align === 'right',
                  })}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {typeof col.render === 'function'
                    ? col.render(row)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={classNames(
              styles.pageButton,
              currentPage === i + 1 && styles.activePage
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
