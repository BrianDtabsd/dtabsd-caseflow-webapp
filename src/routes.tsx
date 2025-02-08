import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import AssistantPage from './pages/assistant/AssistantPage';
import { EmployeeProfile } from './components/profiles/EmployeeProfile';
import { CorrespondencePage } from './pages/correspondence/CorrespondencePage';
import { useAuth } from './context/auth/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? 
          <Navigate to="/dashboard" replace /> : 
          <LoginPage />
        } />
      
      <Route
        element={
          <ProtectedRoute>
            <MainLayout children={undefined} />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/correspondence" element={<CorrespondencePage />} />
        <Route path="/employees/new" element={<EmployeeProfile onSubmit={(data) => console.log(data)} />} />
        <Route path="/employees/:id" element={<EmployeeProfile onSubmit={(data) => console.log(data)} />} />
      </Route>

      {/* Redirect root to login if not authenticated */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 