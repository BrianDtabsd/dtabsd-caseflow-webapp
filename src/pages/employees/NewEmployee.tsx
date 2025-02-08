import { Box } from '@mui/material';
import { EmployeeProfile } from '../../components/profiles/EmployeeProfile';

export const NewEmployee = () => {
  return (
    <Box sx={{ 
      p: 3,
      minHeight: '100vh',
      bgcolor: '#16161e', // Even darker background
    }}>
      <EmployeeProfile />
    </Box>
  );
};