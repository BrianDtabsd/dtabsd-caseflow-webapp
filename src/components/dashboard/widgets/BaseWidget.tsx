import React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Fullscreen as FullscreenIcon,
} from '@mui/icons-material';

interface BaseWidgetProps {
  title: string;
  subtitle?: string;
  onExpand?: () => void;
  onMoreClick?: () => void;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
  minHeight?: number | string;
}

const BaseWidget = ({
  title,
  subtitle,
  onExpand,
  onMoreClick,
  headerActions,
  children,
  minHeight = 300,
}: BaseWidgetProps) => {
  return (
    <Paper 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(40, 40, 40, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(100, 255, 218, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        minHeight,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
          borderColor: 'rgba(100, 255, 218, 0.2)',
        },
      }}
    >
      {/* Widget Header */}
      <Box 
        sx={{ 
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack spacing={0.5}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.1rem',
              color: '#f8f8f2',
              textShadow: '0 0 10px rgba(100, 255, 218, 0.2)',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(248, 248, 242, 0.7)',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Stack>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {headerActions}
          {onExpand && (
            <IconButton 
              size="small"
              onClick={onExpand}
              sx={{ 
                color: 'rgba(248, 248, 242, 0.7)',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  color: '#64ffda',
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  boxShadow: '0 0 12px rgba(100, 255, 218, 0.3)',
                },
                '&:active': {
                  color: '#EC4899',
                  backgroundColor: 'rgba(236, 72, 153, 0.1)',
                  boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
                }
              }}
            >
              <FullscreenIcon />
            </IconButton>
          )}
          {onMoreClick && (
            <IconButton 
              size="small"
              onClick={onMoreClick}
              sx={{ 
                color: 'rgba(248, 248, 242, 0.7)',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  color: '#64ffda',
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  boxShadow: '0 0 12px rgba(100, 255, 218, 0.3)',
                },
                '&:active': {
                  color: '#EC4899',
                  backgroundColor: 'rgba(236, 72, 153, 0.1)',
                  boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
                }
              }}
            >
              <MoreIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Divider sx={{ 
        borderColor: 'rgba(100, 255, 218, 0.1)',
        '&:hover': {
          borderColor: 'rgba(100, 255, 218, 0.2)',
        }
      }} />

      {/* Widget Content */}
      <Box sx={{ 
        flex: 1,
        overflow: 'auto',
        p: 2,
        color: '#f8f8f2',
        '& a': {
          color: '#64ffda',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#95fff0',
            textShadow: '0 0 8px rgba(100, 255, 218, 0.5)',
          },
          '&:active': {
            color: '#EC4899',
            textShadow: '0 0 12px rgba(236, 72, 153, 0.8)',
          }
        },
        '& button': {
          '&:active': {
            boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
          }
        }
      }}>
        {children}
      </Box>
    </Paper>
  );
};

export default BaseWidget; 