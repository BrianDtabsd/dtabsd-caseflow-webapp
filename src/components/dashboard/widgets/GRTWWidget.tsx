import { Box, Paper, Typography, Divider } from '@mui/material';
import { ProgressTimeline } from '../../rtw/GRTWPlan/ProgressTimeline';
import { WeeklyHoursBreakdown } from '../../rtw/GRTWPlan/WeeklyHoursBreakdown';

interface GRTWWidgetProps {
  activePlans: Array<{
    employeeName: string;
    startDate: Date;
    targetDate: Date;
    currentWeek: number;
    weeklyProgress: Array<{
      week: number;
      hours: number;
      targetHours: number;
      date: Date;
    }>;
  }>;
}

export const GRTWWidget = ({ activePlans }: GRTWWidgetProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Active GRTW Plans
      </Typography>
      <Divider sx={{ my: 2 }} />
      
      {activePlans.map((plan) => (
        <Box key={plan.employeeName} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            {plan.employeeName}
          </Typography>
          <ProgressTimeline
            weeks={plan.weeklyProgress}
            startDate={plan.startDate}
            targetDate={plan.targetDate}
            compact // We could add a compact mode for dashboard
          />
        </Box>
      ))}
    </Paper>
  );
}; 