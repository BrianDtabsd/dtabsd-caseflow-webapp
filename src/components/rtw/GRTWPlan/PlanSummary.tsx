import { Paper, Typography, Grid, Divider } from '@mui/material';

interface PlanSummaryProps {
  weeks: WeekPlan[];
  startDate: Date;
  endDate: Date;
}

export const PlanSummary = ({ weeks, startDate, endDate }: PlanSummaryProps) => {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        GRTW Plan Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="text.secondary">
            Duration
          </Typography>
          <Typography variant="body1">
            {weeks.length} weeks ({format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')})
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Weekly Progression
          </Typography>
          {weeks.map((week) => {
            const weeklyHours = week.schedule.reduce((sum, day) => sum + day.hoursWorked, 0);
            return (
              <Box key={week.weekNumber} sx={{ mb: 2 }}>
                <Typography variant="body2">
                  Week {week.weekNumber}: {weeklyHours} hours
                </Typography>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}; 