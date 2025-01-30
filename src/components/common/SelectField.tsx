import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface SelectFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  rules?: Record<string, any>;
  options: Array<{ value: string; label: string }>;
}

export const SelectField = ({ name, rules, options, ...props }: SelectFieldProps) => {
  const { control } = useFormContext();
  const labelId = `${name}-label`;
  const selectId = `${name}-select`;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          select
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
          id={selectId}
          aria-labelledby={labelId}
          InputLabelProps={{
            ...props.InputLabelProps,
            id: labelId
          }}
          SelectProps={{
            ...props.SelectProps,
            native: false,
            inputProps: {
              'aria-label': props.label?.toString() || `Select ${name}`
            }
          }}
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
            '& .MuiSelect-select': {
              color: 'text.primary',
            },
            ...props.sx,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}; 