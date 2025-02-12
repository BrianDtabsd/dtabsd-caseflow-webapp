// src/routes.tsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { useAuth } from './context/auth/AuthContext';
import DashboardPage from './pages/dashboard/DashboardPage';
import CasesPage from './pages/cases/CasesPage';
import EmployersPage from './pages/employers/EmployersPage';
import TasksPage from './pages/tasks/TasksPage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';

// Correspondence Section & Subpages
import { CorrespondencePage } from './pages/correspondence/CorrespondencePage';
import TemplatesPage from './pages/correspondence/templates/TemplatesPage';
import DocumentsPage from './pages/correspondence/documents/DocumentsPage';
import SearchPage from './pages/correspondence/search/SearchPage';
import AIInsightsPage from './pages/correspondence/ai-insights/AIInsightsPage';

// Assistant Section & Subpages
import AssistantPage from './pages/assistant/AssistantPage';
import DocumentAnalysisPage from './pages/assistant/document-analysis/DocumentAnalysisPage';
import TemplateAssistancePage from './pages/assistant/template-assistance/TemplateAssistancePage';
import MedicalInsightsPage from './pages/assistant/medical-insights/MedicalInsightsPage';

// Placeholder component for pages not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div style={{ padding: '20px' }}>
    <h1>{title}</h1>
    <p>Coming Soon...</p>
  </div>
);

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

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<PlaceholderPage title="Login" />} />

      {/* Protected Routes wrapped in MainLayout */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/employees/new" element={<PlaceholderPage title="New Employee" />} />
        <Route path="/employees/:id" element={<PlaceholderPage title="Edit Employee" />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="employees" element={<EmployersPage />} />
        <Route path="employers" element={<EmployersPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Correspondence Section with Nested Routes */}
        <Route path="correspondence" element={<CorrespondencePage />}>
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="ai-insights" element={<AIInsightsPage />} />
          <Route index element={<PlaceholderPage title="Correspondence Overview" />} />
        </Route>

        {/* Assistant Section with Nested Routes */}
        <Route path="assistant" element={<AssistantPage />}>
          <Route path="document-analysis" element={<DocumentAnalysisPage />} />
          <Route path="template-assistance" element={<TemplateAssistancePage />} />
          <Route path="medical-insights" element={<MedicalInsightsPage />} />
          <Route index element={<PlaceholderPage title="Assistant Overview" />} />
        </Route>
      </Route>

      {/* Default Redirect: If the user visits the root path ("/") */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
