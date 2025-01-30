import { Grid } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { validationRules } from '../../../utils/validationRules';
import { SelectField } from '../../common/SelectField';

export const JobInfo = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ValidationTextField
            name="jobTitle"
            label="Job Title"
            fullWidth
            rules={validationRules.required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValidationTextField
            name="department"
            label="Department"
            fullWidth
            rules={validationRules.required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValidationTextField
            name="supervisor"
            label="Supervisor"
            fullWidth
            rules={validationRules.required}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            label="Employment Status"
            name="employmentStatus"
            rules={validationRules.required}
            options={[
              { value: 'full-time', label: 'Full Time' },
              { value: 'part-time', label: 'Part Time' },
              { value: 'contract', label: 'Contract' }
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValidationTextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            rules={validationRules.required}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}; 