import { useState, forwardRef } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// 📌 Locale 설정
dayjs.locale('ko');

// 📌 커스텀 Input 컴포넌트 (아이콘 클릭 시 달력 열기용)
const CustomInput = forwardRef(({ inputRef, inputProps, InputProps }, ref) => {
  return (
    <TextField
      fullWidth
      inputRef={inputRef}
      {...inputProps}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={InputProps?.onClick}>
              <CalendarTodayIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default function MUIDatePicker({
  value,
  onChange,
  placeholder = 'YYYY-MM-DD',
  label = '',
  disabled = false,
  error = false,
  helperText = '',
}) {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <DatePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        inputFormat="YYYY-MM-DD"
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          setOpen(false);
          onChange(newValue ? newValue.toDate() : null);
        }}
        renderInput={(params) => (
          <CustomInput
            {...params}
            placeholder={placeholder}
            label={label}
            disabled={disabled}
            error={error}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  );
}
