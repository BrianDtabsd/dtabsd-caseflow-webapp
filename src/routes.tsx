import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { MainLayout } from './layouts/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import AssistantPage from './pages/assistant/AssistantPage';
import { EmployeeProfile } from './components/profiles/EmployeeProfile';
import { CorrespondencePage } from './pages/correspondence/CorrespondencePage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <Routes>
      {/* No need for separate login/register routes as Amplify Authenticator handles that */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/correspondence" element={<CorrespondencePage />} />
        <Route path="/employees/new" element={<EmployeeProfile onSubmit={(data) => console.log(data)} />} />
        <Route path="/employees/:id" element={<EmployeeProfile onSubmit={(data) => console.log(data)} />} />
      </Route>
      {/* Redirect root to dashboard if authenticated */}
      <Route
        path="/"
        element={
          authStatus === 'authenticated' ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 