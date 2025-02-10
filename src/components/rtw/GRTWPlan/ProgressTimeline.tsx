import { Box, Paper, Typography, LinearProgress, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import TimelineIcon from '@mui/icons-material/Timeline';
import { format } from 'date-fns';

interface TimelinePoint {
  week: number;
  hours: number;
  targetHours: number;
  date: Date;
}

interface ProgressTimelineProps {
  weeks: TimelinePoint[];
  startDate: Date;
  targetDate: Date;
}

const TimelineContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const TimelinePoint = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 12,
    top: '50%',
    width: '100%',
    height: 2,
    backgroundColor: theme.palette.divider,
    zIndex: 0,
  },
}));

export const ProgressTimeline = ({ weeks, startDate, targetDate }: ProgressTimelineProps) => {
  const theme = useTheme();

  return (
    <TimelineContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TimelineIcon color="primary" />
        <Typography variant="h6">Return to Work Progress</Typography>
      </Box>

      <Box sx={{ position: 'relative', mb: 4 }}>
        {weeks.map((point, index) => {
          const progress = (point.hours / point.targetHours) * 100;
          
          return (
            <TimelinePoint key={point.week} sx={{ mb: 2 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                {point.week}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Week {point.week}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {point.hours}/{point.targetHours} hours
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress}
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    bgcolor: theme.palette.grey[200],
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                    }
                  }}
                />
              </Box>
            </TimelinePoint>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
        <Typography variant="caption">
          Start: {format(startDate, 'MMM d, yyyy')}
        </Typography>
        <Typography variant="caption">
          Target: {format(targetDate, 'MMM d, yyyy')}
        </Typography>
      </Box>
    </TimelineContainer>
  );
}; 