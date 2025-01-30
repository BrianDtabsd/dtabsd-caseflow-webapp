import React from 'react';
import { Box, Chip, Paper, Typography } from '@mui/material';
import { Predictions } from './MockPredictions';

interface DocumentClassificationProps {
  documentContent: string;
  onClassificationComplete: (categories: string[]) => void;
}

export const DocumentClassification: React.FC<DocumentClassificationProps> = ({
  documentContent,
  onClassificationComplete,
}) => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const classifyDocument = async () => {
    setIsProcessing(true);
    try {
      // AWS Comprehend integration will go here
      // This is a placeholder for the actual implementation
      const result = await Predictions.interpret({
        text: documentContent,
        type: 'ALL'
      });

      // Process and categorize the document
      const documentCategories = result.textInterpretation.keyPhrases
        .map(phrase => phrase.text)
        .filter(category => category.length > 0);

      setCategories(documentCategories);
      onClassificationComplete(documentCategories);
    } catch (error) {
      console.error('Error classifying document:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (documentContent) {
      classifyDocument();
    }
  }, [documentContent]);

  return (
    <Paper elevation={2} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Document Classification
      </Typography>
      <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {isProcessing ? (
          <Typography>Classifying document...</Typography>
        ) : (
          categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              color="primary"
              variant="outlined"
            />
          ))
        )}
      </Box>
    </Paper>
  );
}; 