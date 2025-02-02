import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Sidebar } from '../components/layout/Sidebar';
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';

const DRAWER_WIDTH = 280;

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { signOut, user } = useAuthenticator((context) => [context.user]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Authenticator.Provider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header 
          onMenuClick={handleSidebarToggle} 
          onSignOut={signOut}
          user={user}
        />
        <Sidebar
          isOpen={!isMobile || isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          drawerWidth={DRAWER_WIDTH}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            mt: 8,
            backgroundColor: theme.palette.mode === 'dark'
              ? theme.palette.background.default
              : '#f9fafb',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Authenticator.Provider>
  );
}; 