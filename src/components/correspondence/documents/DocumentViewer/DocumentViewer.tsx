import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import { DocumentProcessor } from '../AIProcessing/DocumentProcessor';
import { ProcessingResult, DocumentType } from '../AIProcessing/types';

interface DocumentViewerProps {
  document: {
    id: string;
    content: string;
    type: DocumentType;
    filename: string;
  };
  onAnalysisComplete?: (results: ProcessingResult) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onAnalysisComplete,
}) => {
  const handleProcessingComplete = (results: Omit<ProcessingResult, 'timestamp' | 'documentId'>) => {
    if (onAnalysisComplete) {
      onAnalysisComplete({
        ...results,
        timestamp: new Date(),
        documentId: document.id
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {document.filename}
          </Typography>
          <Box 
            sx={{ 
              mt: 2,
              p: 2,
              maxHeight: 'calc(100vh - 300px)',
              overflowY: 'auto',
              bgcolor: 'background.default',
              borderRadius: 1
            }}
          >
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
              {document.content}
            </pre>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <DocumentProcessor
          documentContent={document.content}
          documentType={document.type}
          onProcessingComplete={handleProcessingComplete}
        />
      </Grid>
    </Grid>
  );
}; 