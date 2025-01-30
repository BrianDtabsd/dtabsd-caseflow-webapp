import { Grid, Paper, Typography, Rating } from '@mui/material';
import { ValidationTextField } from '../../common/FormValidation/ValidationTextField';
import { useForm, FormProvider } from 'react-hook-form';

export const JobDemands = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Job Demands Assessment
        </Typography>
        
        {/* Physical Demands */}
        <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>
          Physical Demands
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography component="legend">Lifting/Carrying</Typography>
            <Rating
              name="lifting"
              max={5}
              aria-label="Lifting and carrying requirements"
            />
            <ValidationTextField
              name="liftingDetails"
              label="Details"
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="legend">Standing/Walking</Typography>
            <Rating
              name="standing"
              max={5}
              aria-label="Standing and walking requirements"
            />
            <ValidationTextField
              name="standingDetails"
              label="Details"
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>

        {/* Cognitive Demands */}
        <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }}>
          Cognitive Demands
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography component="legend">Attention/Concentration</Typography>
            <Rating
              name="attention"
              max={5}
              aria-label="Attention and concentration requirements"
            />
            <ValidationTextField
              name="attentionDetails"
              label="Details"
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography component="legend">Decision Making</Typography>
            <Rating
              name="decisionMaking"
              max={5}
              aria-label="Decision making requirements"
            />
            <ValidationTextField
              name="decisionDetails"
              label="Details"
              fullWidth
              multiline
              rows={2}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </FormProvider>
  );
}; 