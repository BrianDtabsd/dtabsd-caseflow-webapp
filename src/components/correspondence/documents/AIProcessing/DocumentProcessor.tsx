import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { MedicalSummary } from './MedicalSummary';
import { DocumentClassification } from './DocumentClassification';
import { KeyInfoExtraction } from './KeyInfoExtraction';
import { KeyInfo } from './types';

interface DocumentProcessorProps {
  documentContent: string;
  documentType?: 'medical' | 'correspondence' | 'form';
  onProcessingComplete: (results: {
    summary?: string;
    categories: string[];
    keyInfo: KeyInfo[];
  }) => void;
}

export const DocumentProcessor: React.FC<DocumentProcessorProps> = ({
  documentContent,
  documentType = 'medical',
  onProcessingComplete,
}) => {
  const [processingResults, setProcessingResults] = React.useState({
    summary: '',
    categories: [] as string[],
    keyInfo: [] as KeyInfo[],
  });

  const handleSummaryGenerated = (summary: string) => {
    setProcessingResults(prev => ({ ...prev, summary }));
    updateResults({ summary });
  };

  const handleClassificationComplete = (categories: string[]) => {
    setProcessingResults(prev => ({ ...prev, categories }));
    updateResults({ categories });
  };

  const handleInfoExtracted = (keyInfo: KeyInfo[]) => {
    setProcessingResults(prev => ({ ...prev, keyInfo }));
    updateResults({ keyInfo });
  };

  const updateResults = (update: Partial<typeof processingResults>) => {
    const newResults = { ...processingResults, ...update };
    onProcessingComplete(newResults);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Document Analysis
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        {documentType === 'medical' && (
          <MedicalSummary
            documentContent={documentContent}
            onSummaryGenerated={handleSummaryGenerated}
          />
        )}

        <DocumentClassification
          documentContent={documentContent}
          onClassificationComplete={handleClassificationComplete}
        />

        <KeyInfoExtraction
          documentContent={documentContent}
          onInfoExtracted={handleInfoExtracted}
        />
      </Box>
    </Paper>
  );
}; 