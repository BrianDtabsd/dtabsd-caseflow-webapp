import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  Chip,
} from '@mui/material';
import {
  Edit,
  FileCopy,
  Delete,
} from '@mui/icons-material';

interface Template {
  id: string;
  name: string;
  category: string;
  lastModified: Date;
  aiTags: string[];
}

interface TemplateListProps {
  templates: Template[];
  onEdit: (templateId: string) => void;
  onCopy: (templateId: string) => void;
  onDelete: (templateId: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onCopy,
  onDelete,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Letter Templates
      </Typography>
      <List>
        {templates.map((template) => (
          <ListItem
            key={template.id}
            divider
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={template.name}
              secondary={
                <>
                  {template.category}
                  <br />
                  Last modified: {template.lastModified.toLocaleDateString()}
                  <br />
                  {template.aiTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mt: 0.5 }}
                    />
                  ))}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(template.id)}
                sx={{ mr: 1 }}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => onCopy(template.id)}
                sx={{ mr: 1 }}
              >
                <FileCopy />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(template.id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 