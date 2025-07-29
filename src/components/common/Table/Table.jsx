// Table.jsx

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
              onClick={() => onRowClick?.(row)}
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
        {totalPages > 1 && (
          <>
            {/* 첫 페이지 이동 */}
            {currentPage > 1 && (
              <button
                onClick={() => onPageChange(1)}
                className={styles.pageButton}
              >
                «
              </button>
            )}

            {/* 5페이지 이전으로 이동 */}
            {currentPage > 5 && (
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 5))}
                className={styles.pageButton}
              >
                ◀
              </button>
            )}

            {/* 페이지 번호 목록 */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={classNames(
                  styles.pageButton,
                  currentPage === page && styles.activePage
                )}
              >
                {page}
              </button>
            ))}

            {/* 5페이지 이후로 이동 */}
            {currentPage + 5 <= totalPages && (
              <button
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 5))
                }
                className={styles.pageButton}
              >
                ▶
              </button>
            )}

            {/* 마지막 페이지 이동 */}
            {currentPage < totalPages && (
              <button
                onClick={() => onPageChange(totalPages)}
                className={styles.pageButton}
              >
                »
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
