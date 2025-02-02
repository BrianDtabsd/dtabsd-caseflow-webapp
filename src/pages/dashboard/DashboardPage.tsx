import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';
import DocumentsWidget from '../../components/dashboard/widgets/DocumentsWidget';

const DashboardPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Active Cases Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Active Cases
              </Typography>
              <Typography variant="body1">
                No cases to display yet.
              </Typography>
            </Paper>
          </Grid>

          {/* Quick Actions Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Typography variant="body1">
                No actions available yet.
              </Typography>
            </Paper>
          </Grid>

          {/* Documents Widget */}
          <Grid item xs={12} md={6} lg={4}>
            <DocumentsWidget />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage; 