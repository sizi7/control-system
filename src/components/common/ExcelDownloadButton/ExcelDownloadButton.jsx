import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';
import Button from '../Button/Button';

export default function ExcelDownloadButton({
  data = [],
  headers = [],
  fileName = 'export.xlsx',
  sheetName = 'Sheet1',
}) {
  const handleDownload = () => {
    if (!data.length || !headers.length) return;

    const headerLabels = headers.map((h) => h.label);
    const headerKeys = headers.map((h) => h.key);

    const excelData = data.map((item, index) => {
      const row = {};
      headerKeys.forEach((key, i) => {
        row[headerLabels[i]] = key === 'No' ? index + 1 : (item[key] ?? '');
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData, {
      header: headerLabels,
    });

    worksheet['!cols'] = headerLabels.map((label) => ({
      wch: Math.max(label.length * 2, 12),
    }));

    headerLabels.forEach((_, colIdx) => {
      const cellAddr = XLSX.utils.encode_cell({ r: 0, c: colIdx });
      if (worksheet[cellAddr]) {
        worksheet[cellAddr].s = {
          font: { bold: true },
          alignment: { horizontal: 'center' },
          fill: { fgColor: { rgb: 'D8D8D8' } },
          border: borderStyle,
        };
      }
    });

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let row = 1; row <= range.e.r; row++) {
      for (let col = 0; col <= range.e.c; col++) {
        const addr = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[addr];
        if (cell) {
          cell.s = {
            ...(cell.s || {}),
            border: borderStyle,
          };
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, fileName);
  };

  return <Button onClick={handleDownload}>엑셀 다운로드</Button>;
}

const borderStyle = {
  top: { style: 'thin', color: { rgb: '999999' } },
  bottom: { style: 'thin', color: { rgb: '999999' } },
  left: { style: 'thin', color: { rgb: '999999' } },
  right: { style: 'thin', color: { rgb: '999999' } },
};
