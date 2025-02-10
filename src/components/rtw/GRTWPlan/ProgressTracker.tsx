import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

interface ProgressTrackerProps {
  currentWeek: number;
  totalWeeks: number;
  targetHours: number;
  currentHours: number;
}

export const ProgressTracker = ({ currentWeek, totalWeeks, targetHours, currentHours }: ProgressTrackerProps) => {
  const progress = (currentHours / targetHours) * 100;

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={currentWeek - 1}>
        {Array.from({ length: totalWeeks }).map((_, index) => (
          <Step key={index}>
            <StepLabel>Week {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Progress to Full-Time Hours
        </Typography>
        <Typography variant="h6">
          {progress.toFixed(1)}% Complete
        </Typography>
      </Box>
    </Box>
  );
}; 