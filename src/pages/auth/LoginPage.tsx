import { Box, TextField, Button, Typography } from '@mui/material';
>>>>>>> Stashed changes

export const LoginPage = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#52636C',
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
          background: 'rgba(218, 224, 215, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: '#FFFFFF' }}>
          Sign in
        </Typography>
        <Box component="form" sx={{ width: '100%' }}>
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
            }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 