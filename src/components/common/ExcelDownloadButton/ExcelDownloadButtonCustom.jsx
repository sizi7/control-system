import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';

export default function ExcelDownloadButtonCustom({
  data,
  fileName = '기관목록.xlsx',
}) {
  const handleDownload = () => {
    const headers = [
      'No',
      '기관명',
      '기관 코드',
      '측정 기간',
      '장치 관리',
      '비식별화',
      'HIS 연동 여부',
    ];

    const excelData = data.map((item, index) => ({
      No: index + 1,
      기관명: item.organizationName,
      '기관 코드': item.organizationCode,
      '측정 기간': item.measurementPeriod,
      '장치 관리': item.deviceManagement,
      비식별화: item.deIdentification,
      'HIS 연동 여부': item.his,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData, { header: headers });

    // 🔹 열 너비 지정
    worksheet['!cols'] = [
      { wch: 5 },
      { wch: 30 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
    ];

    // 🔹 헤더 스타일
    headers.forEach((_, idx) => {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: idx });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          alignment: { horizontal: 'center' },
          fill: { fgColor: { rgb: 'D8D8D8' } },
          border: {
            top: { style: 'thin', color: { rgb: '999999' } },
            bottom: { style: 'thin', color: { rgb: '999999' } },
            left: { style: 'thin', color: { rgb: '999999' } },
            right: { style: 'thin', color: { rgb: '999999' } },
          },
        };
      }
    });

    // 🔹 모든 셀에 테두리 적용
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let row = 1; row <= range.e.r; row++) {
      for (let col = 0; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[cellAddress];
        if (cell && cell.v !== undefined) {
          cell.s = {
            ...(cell.s || {}),
            border: {
              top: { style: 'thin', color: { rgb: '999999' } },
              bottom: { style: 'thin', color: { rgb: '999999' } },
              left: { style: 'thin', color: { rgb: '999999' } },
              right: { style: 'thin', color: { rgb: '999999' } },
            },
          };
        }
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '기관 목록');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, fileName);
  };

  return <button onClick={handleDownload}>엑셀 다운로드</button>;
}
