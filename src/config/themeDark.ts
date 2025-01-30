import { createTheme } from '@mui/material/styles';

export const themeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',    // Mint/aqua - modern and clean
      light: '#95fff0',
      dark: '#14b8a6',
    },
    secondary: {
      main: '#bd93f9',    // Soft purple
      light: '#d6b7ff',
      dark: '#9d4edd',
    },
    success: {
      main: '#10B981',    // Mint Glow
    },
    text: {
      primary: '#f8f8f2',
      secondary: 'rgba(248, 248, 242, 0.7)',
    },
    background: {
      default: '#282a36', // Deep blue-grey
      paper: '#44475a',   // Lighter blue-grey
    },
    grey: {
      300: 'rgba(255, 255, 255, 0.1)',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: `0 0 12px #64ffda`,
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64ffda',
            }
          }
        },
      },
    },
  }
}); 