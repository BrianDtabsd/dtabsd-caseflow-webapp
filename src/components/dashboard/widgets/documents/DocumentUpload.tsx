import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';

interface DocumentUploadProps {
  open: boolean;
  onClose: () => void;
}

const DocumentUpload = ({ open, onClose }: DocumentUploadProps) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(40, 40, 40, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          borderRadius: '12px',
        }
      }}
    >
      <DialogTitle sx={{ color: '#f8f8f2' }}>
        Upload Document
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          minHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed rgba(100, 255, 218, 0.2)',
          borderRadius: '8px',
          p: 3,
          mt: 2,
          color: '#f8f8f2',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#64ffda',
            backgroundColor: 'rgba(100, 255, 218, 0.05)',
          }
        }}>
          <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
            Drag and drop files here, or click to select files
          </Typography>
          <Typography variant="caption" color="rgba(248, 248, 242, 0.7)">
            Supported formats: PDF, DOC, DOCX, JPG, PNG
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'rgba(248, 248, 242, 0.7)',
            '&:hover': {
              color: '#64ffda',
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="contained"
          sx={{
            backgroundColor: '#64ffda',
            color: '#282a36',
            '&:hover': {
              backgroundColor: '#95fff0',
            },
            '&:active': {
              backgroundColor: '#EC4899',
              boxShadow: '0 0 16px rgba(236, 72, 153, 0.5)',
            }
          }}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentUpload; 