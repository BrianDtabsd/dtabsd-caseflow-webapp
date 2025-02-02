import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user
  ]);

  return (
    <Authenticator.Provider>
      {authStatus === 'configuring' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : authStatus !== 'authenticated' || !user ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <>{children}</>
      )}
    </Authenticator.Provider>
  );
};

export default ProtectedRoute; 