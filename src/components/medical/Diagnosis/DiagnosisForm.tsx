import { Grid } from '@mui/material';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { useForm, FormProvider } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DiagnosisForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ValidationTextField
            name="primaryDiagnosis"
            label="Primary Diagnosis"
            fullWidth
            multiline
            rows={2}
            rules={{ required: 'Primary diagnosis is required' }}
          />
        </Grid>
        <Grid item xs={12}>
          <ValidationTextField
            name="secondaryDiagnosis"
            label="Secondary Diagnoses"
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValidationTextField
            name="icd10Code"
            label="ICD-10 Code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Diagnosis Date"
            onChange={() => {}}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12}>
          <ValidationTextField
            name="prognosis"
            label="Prognosis"
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}; 