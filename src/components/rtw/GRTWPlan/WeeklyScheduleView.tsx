import { Grid, Paper, Typography } from '@mui/material';

interface WeeklyScheduleViewProps {
  week: WeekPlan;
  totalTargetHours?: number;
}

export const WeeklyScheduleView = ({ week, totalTargetHours = 40 }: WeeklyScheduleViewProps) => {
  const totalHours = week.schedule.reduce((sum, day) => sum + day.hoursWorked, 0);
  const progressPercentage = (totalHours / totalTargetHours) * 100;

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Week {week.weekNumber} Schedule Summary
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mb: 2
          }}>
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage}
              sx={{ flexGrow: 1, mr: 2 }}
            />
            <Typography variant="body2">
              {totalHours}/{totalTargetHours} hours ({progressPercentage.toFixed(1)}%)
            </Typography>
          </Box>
        </Grid>
        {week.schedule.map((day) => (
          <Grid item xs={12} sm={6} md={2.4} key={day.day}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 1, 
                bgcolor: 'background.default',
                textAlign: 'center'
              }}
            >
              <Typography variant="subtitle2">{day.day}</Typography>
              <Typography variant="body2">
                {day.startTime} - {day.endTime}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {day.hoursWorked} hrs
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}; 