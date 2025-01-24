import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#52636C',     // Payne's gray - primary color
      light: '#91a3ac',    // Payne's gray 700 - lighter version
      dark: '#414f56',     // Payne's gray 400 - darker version
    },
    secondary: {
      main: '#9FB8B9',     // Ash gray - secondary color
      light: '#c4d4d5',    // Ash gray 700
      dark: '#769a9c',     // Ash gray 400
    },
    action: {
      active: '#48AFB1',   // Verdigris - bright action color
    },
    text: {
      primary: '#2A2F3A',  // Gunmetal - dark text
      secondary: '#52636C', // Payne's gray - secondary text
    },
    background: {
      default: '#DAE0D7',  // Alabaster - background
      paper: '#fff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:active': {
            boxShadow: '0 0 12px #48AFB1',  // Verdigris glow on press
          }
        }
      }
    }
  }
}); 