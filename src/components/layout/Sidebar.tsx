// src/components/layout/Sidebar.tsx

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Description,
  People,
  Assignment,
  Assessment,
  Settings,
  SmartToy,
} from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  drawerWidth: number;
}

// Extend your main menu items with the new pages
const mainMenuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Cases', icon: <Description />, path: '/cases' },
  { text: 'Employers', icon: <People />, path: '/employers' },
  { text: 'Tasks', icon: <Assignment />, path: '/tasks' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: '+ New Employee', icon: <PersonAddIcon />, path: '/employees/new' },
  { text: 'Correspondence', icon: <MailOutlineIcon />, path: '/correspondence' },
  { text: 'Edit Employee (Example)', icon: <People />, path: '/employees/1' },
];

const bottomMenuItems = [
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const Sidebar = ({ isOpen, onClose, drawerWidth }: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); // close the drawer after navigation if needed
  };

  const MenuListItem = ({ item }: { item: { text: string; icon: JSX.Element; path: string } }) => (
    <ListItem disablePadding>
      <ListItemButton
        selected={location.pathname === item.path}
        onClick={() => handleNavigation(item.path)}
        sx={{
          '&.Mui-selected': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 121, 198, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 121, 198, 0.2)'
                  : 'rgba(16, 185, 129, 0.2)',
            },
          },
          '&:hover': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255, 121, 198, 0.1)'
                : 'rgba(16, 185, 129, 0.1)',
          },
        }}
      >
        <ListItemIcon
          sx={{
            color:
              location.pathname === item.path
                ? theme.palette.mode === 'dark'
                  ? '#ff79c6'
                  : '#10B981'
                : 'inherit',
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          sx={{
            '& .MuiListItemText-primary': {
              color:
                location.pathname === item.path
                  ? theme.palette.mode === 'dark'
                    ? '#ff79c6'
                    : '#10B981'
                  : theme.palette.text.primary,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
      open={isOpen}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          mt: 8,
        }}
      >
        {/* Main navigation items */}
        <List>
          {mainMenuItems.map((item) => (
            <MenuListItem key={item.text} item={item} />
          ))}
        </List>

        {/* CAISEY (Assistant) section */}
        <Box sx={{ p: 2 }}>
          <Divider />
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              cursor: 'pointer',
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? 'rgba(255, 121, 198, 0.1)'
                  : 'rgba(16, 185, 129, 0.1)',
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 121, 198, 0.2)'
                    : 'rgba(16, 185, 129, 0.2)',
              },
            }}
            onClick={() => handleNavigation('/assistant')}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToy
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ff79c6' : '#10B981',
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ff79c6' : '#10B981',
                  fontWeight: 500,
                }}
              >
                CAISEY
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              Your virtual assistant
            </Typography>
          </Box>
        </Box>

        {/* Bottom items (Settings) */}
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          <List>
            {bottomMenuItems.map((item) => (
              <MenuListItem key={item.text} item={item} />
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
