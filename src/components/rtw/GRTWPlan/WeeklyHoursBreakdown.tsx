import { Box, Paper, Typography, Grid, LinearProgress, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { calculateHours } from '../../../utils/timeCalculations';

interface WeeklyHoursBreakdownProps {
  week: {
    weekNumber: number;
    schedule: Array<{
      day: string;
      startTime: string;
      endTime: string;
      hoursWorked: number;
    }>;
  };
  regularHours: number;
  showProgress?: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const DayBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const WeeklyHoursBreakdown = ({ 
  week, 
  regularHours = 40,
  showProgress = true 
}: WeeklyHoursBreakdownProps) => {
  const totalWeeklyHours = week.schedule.reduce((sum, day) => 
    sum + calculateHours(day.startTime, day.endTime), 0
  );
  
  const progressPercentage = (totalWeeklyHours / regularHours) * 100;
  const dailyRegularHours = regularHours / 5;

  return (
    <StyledPaper>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Week {week.weekNumber} Hours
        </Typography>
        {showProgress && (
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Progress to Full Schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {totalWeeklyHours}/{regularHours} hours
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={Math.min(progressPercentage, 100)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </Box>

      <Grid container spacing={1}>
        {week.schedule.map((day) => {
          const dailyHours = calculateHours(day.startTime, day.endTime);
          const dailyPercentage = (dailyHours / dailyRegularHours) * 100;
          
          return (
            <Grid item xs={12} key={day.day}>
              <Tooltip 
                title={`${dailyHours} of ${dailyRegularHours} hours (${dailyPercentage.toFixed(1)}%)`}
                arrow
              >
                <DayBox>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {day.day}
                    </Typography>
                    <Typography variant="body2">
                      {day.startTime} - {day.endTime}
                    </Typography>
                    <Typography variant="body2" color={
                      dailyHours > dailyRegularHours ? 'error.main' : 'text.primary'
                    }>
                      {dailyHours} hrs
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={Math.min(dailyPercentage, 100)}
                    sx={{ 
                      height: 4, 
                      borderRadius: 2,
                      mt: 1,
                      backgroundColor: theme => 
                        dailyHours > dailyRegularHours 
                          ? theme.palette.error.light 
                          : undefined
                    }}
                  />
                </DayBox>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        <Typography variant="body2" color="text.secondary" align="right">
          Total Weekly Hours: {totalWeeklyHours.toFixed(1)}
        </Typography>
      </Box>
    </StyledPaper>
  );
}; 