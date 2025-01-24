import { Box, TextField, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Logo = styled('img')({
  height: 24,
  marginBottom: 24,
});

export const LoginPage = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#52636C', // Payne's gray for background
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 360,
          background: 'rgba(218, 224, 215, 0.15)', // Frosted alabaster
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Logo
          src="/your-logo.svg"
          alt="Company Logo"
        />
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3,
            color: '#FFFFFF', // Whiter text
            fontWeight: 500 
          }}
        >
          Sign in
        </Typography>
        <Box 
          component="form" 
          sx={{ width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#9FB8B9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#48AFB1',
                  boxShadow: '0 0 0 2px rgba(72, 175, 177, 0.2)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.05)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: '#9FB8B9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#48AFB1',
                  boxShadow: '0 0 0 2px rgba(72, 175, 177, 0.2)',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              bgcolor: '#48AFB1',
              '&:hover': {
                bgcolor: '#3a8d8e',
              },
              '&:active': {
                bgcolor: '#2b696a',
                boxShadow: '0 0 12px #48AFB1',
              },
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 