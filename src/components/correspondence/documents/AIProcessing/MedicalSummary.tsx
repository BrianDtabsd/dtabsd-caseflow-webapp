import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Predictions } from './MockPredictions';

interface MedicalSummaryProps {
  documentContent: string;
  onSummaryGenerated: (summary: string) => void;
}

export const MedicalSummary: React.FC<MedicalSummaryProps> = ({
  documentContent,
  onSummaryGenerated,
}) => {
  const [summary, setSummary] = React.useState<string>('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const processMedicalDocument = async () => {
    setIsProcessing(true);
    try {
      // AWS Comprehend Medical integration will go here
      // This is a placeholder for the actual implementation
      const result = await Predictions.interpret({
        text: documentContent,
        type: 'MEDICAL'
      });

      setSummary(result.text);
      onSummaryGenerated(result.text);
    } catch (error) {
      console.error('Error processing medical document:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (documentContent) {
      processMedicalDocument();
    }
  }, [documentContent]);

  return (
    <Paper elevation={2} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Medical Document Summary
      </Typography>
      <Box sx={{ mt: 2 }}>
        {isProcessing ? (
          <Typography>Processing medical document...</Typography>
        ) : (
          <Typography>{summary}</Typography>
        )}
      </Box>
    </Paper>
  );
}; 