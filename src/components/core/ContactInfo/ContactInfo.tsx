import { Grid, TextField } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { validationRules } from '../../../utils/validationRules';

export const ContactInfo = () => {
  const methods = useForm();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      return value;
    }
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ValidationTextField
            name="firstName"
            label="First Name"
            fullWidth
            rules={validationRules.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ValidationTextField
            name="lastName"
            label="Last Name"
            fullWidth
            rules={validationRules.required}
          />
        </Grid>
        <Grid item xs={12}>
          <ValidationTextField
            name="email"
            label="Email"
            fullWidth
            rules={{
              ...validationRules.required,
              ...validationRules.email,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone"
            name="phone"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const formattedValue = handlePhoneChange(e);
              if (formattedValue) e.target.value = formattedValue;
            }}
            placeholder="(123) 456-7890"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ValidationTextField
            name="extension"
            label="Extension"
            fullWidth
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}; 