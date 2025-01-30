import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1',    // Cosmic Indigo - for main actions and brand elements
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#F472B6',    // Blossom Pink - for complementary highlights
      light: '#F9A8D4',
      dark: '#EC4899',
    },
    success: {
      main: '#10B981',    // Mint Glow - for CTAs and hover states
    },
    text: {
      primary: '#111827', // Midnight Gray - for main text
      secondary: '#9CA3AF', // Foggy Gray - for secondary text
    },
    background: {
      default: '#F3F4F6', // Cloud White - main backdrop
      paper: '#FFFFFF',   // Pure white for cards/panels
    },
    grey: {
      300: '#9CA3AF',    // Foggy Gray - for borders and dividers
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: `0 0 12px #10B981`,  // Mint Glow effect
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
              borderColor: '#374151', // Darker grey for input borders
            },
            '&:hover fieldset': {
              borderColor: '#111827', // Even darker on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6366F1', // Cosmic Indigo when focused
            }
          }
        },
      },
    },
  }
}); 