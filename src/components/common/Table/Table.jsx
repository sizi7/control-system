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

  // 페이징 번호 계산 함수
  const getVisiblePages = () => {
    const maxVisible = 5; // 보여줄 페이지 번호 개수
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisible - 1);

    // 끝에서 부족한 만큼 앞으로 조정
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

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
            <button
              onClick={() => onPageChange(1)}
              className={styles.pageButton}
              disabled={currentPage === 1}
            >
              «
            </button>

            {/* 이전 페이지 */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={styles.pageButton}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {/* 시작 생략 표시 */}
            {visiblePages[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className={styles.pageButton}
                >
                  1
                </button>
                {visiblePages[0] > 2 && (
                  <span className={styles.ellipsis}>...</span>
                )}
              </>
            )}

            {/* 페이지 번호 목록 (제한된 개수만 표시) */}
            {visiblePages.map((page) => (
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

            {/* 끝 생략 표시 */}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className={styles.ellipsis}>...</span>
                )}
                <button
                  onClick={() => onPageChange(totalPages)}
                  className={styles.pageButton}
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* 다음 페이지 */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={styles.pageButton}
              disabled={currentPage === totalPages}
            >
              ›
            </button>

            {/* 마지막 페이지 이동 */}
            <button
              onClick={() => onPageChange(totalPages)}
              className={styles.pageButton}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </>
        )}
      </div>
    </div>
  );
}
