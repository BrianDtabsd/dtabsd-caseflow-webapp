import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/auth/AuthContext';
import { themeDark } from './config/themeDark';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import { Authenticator } from '@aws-amplify/ui-react';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-2_fVZXoTuLW',
      userPoolClientId: '4l2gnf11i48pq62guo250as6fu',
      signUpVerificationMethod: 'code'
    }
  }
});

// Add global styles
const style = document.createElement('style');
style.textContent = `
  body {
    background: linear-gradient(135deg, #2d2d2d, #353535);
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CustomThemeProvider>
          <ThemeProvider theme={themeDark}>
            <CssBaseline />
            <ErrorBoundary>
              <Authenticator.Provider>
                <AppRoutes />
              </Authenticator.Provider>
            </ErrorBoundary>
          </ThemeProvider>
        </CustomThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
