import { Box, Typography, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const PrintContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  '@media print': {
    padding: '20px',
    '& .MuiDivider-root': {
      borderColor: '#000',
    },
  },
}));

const PrintSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  pageBreakInside: 'avoid',
}));

export const PrintView = ({ weeks, startDate, endDate, supervisorInfo }) => {
  return (
    <PrintContainer>
      <PrintSection>
        <Typography variant="h5" gutterBottom>
          Gradual Return to Work Plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Start Date: {format(startDate, 'MMM d, yyyy')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Expected Completion: {format(endDate, 'MMM d, yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </PrintSection>

      <Divider sx={{ my: 3 }} />

      {weeks.map((week) => (
        <PrintSection key={week.weekNumber}>
          <Typography variant="h6" gutterBottom>
            Week {week.weekNumber}
          </Typography>
          
          <Grid container spacing={2}>
            {week.schedule.map((day) => (
              <Grid item xs={12} key={day.day}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">{day.day}</Typography>
                  <Typography variant="body1">
                    {day.startTime} - {day.endTime} ({day.hoursWorked} hours)
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Restrictions & Limitations</Typography>
            <Typography variant="body2">{week.restrictions}</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2">Modified Duties</Typography>
            <Typography variant="body2">{week.duties}</Typography>
          </Box>
        </PrintSection>
      ))}

      <Divider sx={{ my: 3 }} />

      <PrintSection>
        <Typography variant="h6" gutterBottom>
          Approval
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2">
              Supervisor: {supervisorInfo.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              Date: {format(supervisorInfo.approvalDate, 'MMM d, yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </PrintSection>
    </PrintContainer>
  );
}; 