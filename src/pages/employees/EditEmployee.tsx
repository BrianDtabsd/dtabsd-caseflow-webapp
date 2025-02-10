import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const EditEmployee = () => {
  const { id } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Edit Employee {id}</Typography>
    </Box>
  );
};
