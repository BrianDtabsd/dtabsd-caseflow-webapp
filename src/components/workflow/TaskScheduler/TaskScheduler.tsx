import { Box, Grid, Paper, Typography } from '@mui/material';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { SelectField } from '../../common/SelectField';
import { useForm, FormProvider } from 'react-hook-form';

interface FollowUpRule {
  triggerEvent: string;
  action: string;
  frequency: number;
  duration: number;
}

export const TaskScheduler = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Follow-up Schedule
        </Typography>
        <Box component="form">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ValidationTextField
                name="ruleName"
                label="Rule Name"
                fullWidth
                rules={{ required: 'Rule name is required' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectField
                name="triggerEvent"
                label="Trigger Event"
                options={[
                  { value: 'medical-form-requested', label: 'Medical Form Requested' },
                  { value: 'rtw-plan-initiated', label: 'RTW Plan Initiated' },
                  { value: 'benefit-approved', label: 'Benefit Approved' }
                ]}
                rules={{ required: 'Trigger event is required' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectField
                label="Task Priority"
                name="priority"
                rules={{ required: 'Priority is required' }}
                options={[
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' }
                ]}
              />
            </Grid>
            {/* Additional rule configuration fields */}
          </Grid>
        </Box>
      </Paper>
    </FormProvider>
  );
}; 