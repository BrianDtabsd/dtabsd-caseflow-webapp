import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Predictions } from './MockPredictions';

interface KeyInfo {
  type: string;
  text: string;
  confidence: number;
}

interface KeyInfoExtractionProps {
  documentContent: string;
  onInfoExtracted: (info: KeyInfo[]) => void;
}

export const KeyInfoExtraction: React.FC<KeyInfoExtractionProps> = ({
  documentContent,
  onInfoExtracted,
}) => {
  const [keyInfo, setKeyInfo] = React.useState<KeyInfo[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const extractKeyInfo = async () => {
    setIsProcessing(true);
    try {
      // AWS Comprehend Medical integration will go here
      // This is a placeholder for the actual implementation
      const result = await Predictions.interpret({
        text: documentContent,
        type: 'MEDICAL'
      });

      // Process and extract key medical information
      const extractedInfo = result.entities.map(entity => ({
        type: entity.category,
        text: entity.text,
        confidence: entity.score
      }));

      setKeyInfo(extractedInfo);
      onInfoExtracted(extractedInfo);
    } catch (error) {
      console.error('Error extracting key information:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  React.useEffect(() => {
    if (documentContent) {
      extractKeyInfo();
    }
  }, [documentContent]);

  return (
    <Paper elevation={2} sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Key Information
      </Typography>
      <Box sx={{ mt: 2 }}>
        {isProcessing ? (
          <Typography>Extracting key information...</Typography>
        ) : (
          <List>
            {keyInfo.map((info, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={info.text}
                  secondary={`${info.type} (Confidence: ${(info.confidence * 100).toFixed(1)}%)`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
}; 