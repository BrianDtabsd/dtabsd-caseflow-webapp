import { Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { validationRules } from '../../../utils/validationRules';

export const ContactInfo = () => {
  const methods = useForm();

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
          <ValidationTextField
            name="phone"
            label="Phone"
            fullWidth
            rules={validationRules.phone}
            type="tel"
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