import { Grid, Paper, Typography, Box } from '@mui/material';
import { WeeklyHoursBreakdown } from './WeeklyHoursBreakdown';

interface WeekComparisonProps {
  weeks: WeekPlan[];
  regularHours: number;
}

export const WeekComparison = ({ weeks, regularHours }: WeekComparisonProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Weekly Progress Comparison
      </Typography>
      <Grid container spacing={2}>
        {weeks.map((week, index) => (
          <Grid item xs={12} md={6} key={week.weekNumber}>
            <WeeklyHoursBreakdown
              week={week}
              regularHours={regularHours}
              showProgress
              previousWeek={index > 0 ? weeks[index - 1] : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 