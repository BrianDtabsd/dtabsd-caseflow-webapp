import { Box, Typography, Paper } from '@mui/material';

export const DashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>
          Welcome to Case Management
        </Typography>
      </Paper>
    </Box>
  );
}; 