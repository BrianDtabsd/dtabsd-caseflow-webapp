import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface ValidationTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  rules?: Record<string, any>;
}

export const ValidationTextField = ({ name, rules, ...props }: ValidationTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00ffff',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#00ffff',
            },
            '& .MuiInputBase-input': {
              color: 'text.primary',
            },
            ...props.sx,
          }}
        />
      )}
    />
  );
}; 