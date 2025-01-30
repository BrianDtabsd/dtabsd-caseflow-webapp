import { Grid, Paper, Typography } from '@mui/material';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SelectField } from '../../common/SelectField';
import { useForm, FormProvider } from 'react-hook-form';

export const TreatmentPlanForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ValidationTextField
            name="recommendedTreatments"
            label="Recommended Treatments"
            fullWidth
            multiline
            rows={3}
            rules={{ required: 'Treatment plan is required' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ValidationTextField
            name="medications"
            label="Medications"
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Specialist Referrals
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SelectField
                  name="specialistType"
                  label="Specialist Type"
                  options={[
                    { value: '', label: 'Select type' },
                    { value: 'physiotherapist', label: 'Physiotherapist' },
                    { value: 'occupationalTherapist', label: 'Occupational Therapist' },
                    { value: 'psychiatrist', label: 'Psychiatrist' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Referral Date"
                  onChange={() => {}}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Restrictions and Limitations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ValidationTextField
                  name="restrictions"
                  label="Restrictions"
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Start Date"
                  onChange={() => {}}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  onChange={() => {}}
                  sx={{ width: '100%' }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Approximate RTW Date"
            onChange={() => {}}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            label="Treatment Type"
            name="treatmentType"
            title="Select treatment type"
            options={[
              { value: 'physio', label: 'Physiotherapy' },
              { value: 'chiro', label: 'Chiropractic' },
              { value: 'massage', label: 'Massage Therapy' }
            ]}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}; 