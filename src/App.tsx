import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeDark } from './config/themeDark';
import { AuthForm } from './components/auth/AuthForm';

const App = () => {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <AuthForm />
    </ThemeProvider>
  );
};

export default App;
