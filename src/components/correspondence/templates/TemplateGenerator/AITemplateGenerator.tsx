import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Predictions } from '@aws-amplify/predictions';

interface CaseData {
  subject: {
    name: string;
    address: string;
  };
  employer: {
    name: string;
    address: string;
  };
  caseDetails: {
    id: string;
    type: string;
  };
}

interface AITemplateGeneratorProps {
  templateId: string;
  caseData: CaseData;
  onGenerate: (content: string) => void;
}

export const AITemplateGenerator: React.FC<AITemplateGeneratorProps> = ({
  templateId,
  caseData,
  onGenerate,
}) => {
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([]);

  const generateContent = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // AWS AI integration for content generation
      const result = await Predictions.interpret({
        text: JSON.stringify(caseData),
        type: 'ALL'
      });

      // Process AI suggestions for content improvements
      const suggestions = result.textInterpretation.keyPhrases
        .map(phrase => phrase.text);
      setAiSuggestions(suggestions);

      // Generate the content with placeholders filled
      const content = `Dear ${caseData.subject.name},

[AI-generated content will be inserted here based on template and case data]

Sincerely,
Case Manager`;

      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    onGenerate(generatedContent);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Content
          </Typography>
          {isGenerating ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                multiline
                rows={12}
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={generateContent}
                  disabled={isGenerating}
                >
                  Regenerate
                </Button>
                <Button
                  variant="contained"
                  onClick={handleGenerate}
                  disabled={!generatedContent}
                >
                  Use Generated Content
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Suggestions
          </Typography>
          <Box>
            {aiSuggestions.map((suggestion, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{ mb: 1, color: 'text.secondary' }}
              >
                • {suggestion}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}; 