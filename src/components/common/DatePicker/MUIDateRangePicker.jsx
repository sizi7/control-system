import { useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { TextField, Box } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function MUIDateRangePicker({
  value,
  onChange,
  label = '날짜 범위',
  disabled = false,
  error = false,
}) {
  const [inputValue, setInputValue] = useState(['', '']);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DateRangePicker
        startText="시작일"
        endText="종료일"
        inputFormat="YYYY-MM-DD"
        value={
          value
            ? [
                value[0] ? dayjs(value[0]) : null,
                value[1] ? dayjs(value[1]) : null,
              ]
            : [null, null]
        }
        onChange={(newRange) => {
          if (!newRange) return;
          onChange([
            newRange[0] ? newRange[0].toDate() : null,
            newRange[1] ? newRange[1].toDate() : null,
          ]);
        }}
        onInputChange={(newInput) => setInputValue(newInput)}
        renderInput={(startProps, endProps) => (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField {...startProps} disabled={disabled} error={error} />
            <TextField {...endProps} disabled={disabled} error={error} />
          </Box>
        )}
      />
    </LocalizationProvider>
  );
}
