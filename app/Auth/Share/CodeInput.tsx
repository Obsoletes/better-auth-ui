import React, { useRef, useState } from 'react';
import { Box, TextField, type SxProps, type Theme } from '@mui/material';

export const CodeInput = ({
  onComplete,
  sx,
}: {
  onComplete?: (code: string) => void;
  sx?: SxProps<Theme>;
}) => {
  const [values, setValues] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(0, 1);
    if (!digit) return;

    const newValues = [...values];
    newValues[index] = digit;
    setValues(newValues);

    // Move to next input
    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }

    // If all filled, trigger callback
    if (newValues.every((v) => v.length === 1)) {
      onComplete?.(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];

      if (newValues[index]) {
        // 当前框有内容 → 清空
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        // 当前框为空 → 清空前一个并跳转
        newValues[index - 1] = '';
        setValues(newValues);
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < values.length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    } else if (e.key === 'Delete') {
      e.preventDefault();
      const newValues = [...values];
      if (newValues[index]) {
        // 清空当前框
        newValues[index] = '';
        setValues(newValues);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData('Text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (pasted.length === 6) {
      const newValues = pasted.split('');
      setValues(newValues);
      onComplete?.(pasted);
      inputsRef.current[5]?.focus();
    }
    e.preventDefault();
  };

  return (
    <Box display="flex" gap={1} onPaste={handlePaste} sx={sx}>
      {values.map((val, i) => (
        <TextField
          key={i}
          inputRef={(el) => (inputsRef.current[i] = el)}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              inputMode: 'numeric',
              style: { textAlign: 'center' },
            },
          }}
          sx={{ width: 48 }}
        />
      ))}
    </Box>
  );
};
