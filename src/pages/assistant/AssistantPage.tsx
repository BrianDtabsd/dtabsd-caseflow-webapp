import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const AssistantPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          AI Assistant
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1">
            AI features are coming soon!
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AssistantPage; 