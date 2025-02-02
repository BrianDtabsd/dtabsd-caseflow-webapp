import React from 'react';
import {
  ListItem,
  IconButton,
  Stack,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Description as DocIcon,
  MedicalInformation as MedicalIcon,
  Assignment as AssessmentIcon,
  KeyboardReturn as RTWIcon,
  OpenInNew as OpenIcon,
} from '@mui/icons-material';

interface Document {
  id: string;
  type: string;
  title: string;
  subjectName: string;
  createdAt: string | Date;
  tags: string[];
}

interface DocumentListItemProps {
  document: Document;
  onOpen: (id: string) => void;
}

const DocumentListItem = ({ document, onOpen }: DocumentListItemProps) => {
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <MedicalIcon sx={{ color: '#64ffda' }} />;
      case 'rtw':
        return <RTWIcon sx={{ color: '#bd93f9' }} />;
      case 'assessment':
        return <AssessmentIcon sx={{ color: '#EC4899' }} />;
      default:
        return <DocIcon sx={{ color: '#f8f8f2' }} />;
    }
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'rgba(45, 45, 45, 0.8)',
        borderRadius: '8px',
        mb: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          transform: 'translateX(4px)',
        },
      }}
    >
      {getDocumentIcon(document.type)}
      <Stack spacing={0.5} sx={{ flex: 1 }}>
        <Typography variant="subtitle2" sx={{ color: '#f8f8f2' }}>
          {document.title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(248, 248, 242, 0.7)' }}>
          {document.subjectName} • {new Date(document.createdAt).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
          {document.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                color: '#64ffda',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Stack>
      <IconButton
        size="small"
        onClick={() => onOpen(document.id)}
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
          },
        }}
      >
        <OpenIcon />
      </IconButton>
    </ListItem>
  );
};

export default DocumentListItem; 