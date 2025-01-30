import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Autocomplete,
} from '@mui/material';
import { Predictions } from '@aws-amplify/predictions';

interface TemplateField {
  name: string;
  type: 'text' | 'date' | 'number';
  required: boolean;
}

interface AITemplateEditorProps {
  templateId?: string;
  initialContent?: string;
  onSave: (content: string, fields: TemplateField[]) => void;
}

export const AITemplateEditor: React.FC<AITemplateEditorProps> = ({
  templateId,
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = React.useState(initialContent);
  const [suggestedFields, setSuggestedFields] = React.useState<TemplateField[]>([]);
  const [aiSuggestions, setAiSuggestions] = React.useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  const analyzeTemplate = async () => {
    setIsAnalyzing(true);
    try {
      // AWS AI integration for template analysis
      const result = await Predictions.interpret({
        text: content,
        type: 'ALL'
      });

      // Extract potential fields and variables
      const fields = result.textInterpretation.entities
        .filter(entity => entity.type === 'VARIABLE')
        .map(entity => ({
          name: entity.text,
          type: 'text',
          required: true
        }));

      setSuggestedFields(fields);

      // Get content improvement suggestions
      const suggestions = result.textInterpretation.keyPhrases
        .map(phrase => phrase.text);

      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error analyzing template:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    onSave(content, suggestedFields);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Template Editor
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            variant="outlined"
            placeholder="Enter your template content here..."
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={analyzeTemplate}
              disabled={!content || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Template'}
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={!content}
            >
              Save Template
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Insights
          </Typography>
          
          <Typography variant="subtitle2" gutterBottom>
            Suggested Fields
          </Typography>
          <Box sx={{ mb: 3 }}>
            {suggestedFields.map((field, index) => (
              <Chip
                key={index}
                label={field.name}
                variant="outlined"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            Content Suggestions
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