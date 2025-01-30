import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import { Link } from '@mui/icons-material';

interface CaseFile {
  id: string;
  subject: string;
  employer: string;
  caseManager: string;
}

interface DocumentAssignmentProps {
  documentId: string;
  currentCaseFile?: CaseFile;
  onAssign: (caseFileId: string) => void;
}

export const DocumentAssignment: React.FC<DocumentAssignmentProps> = ({
  documentId,
  currentCaseFile,
  onAssign,
}) => {
  const [selectedCase, setSelectedCase] = React.useState<CaseFile | null>(
    currentCaseFile || null
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  // This would be replaced with actual API call
  const searchCases = async (query: string) => {
    // Placeholder for case search functionality
    return [];
  };

  const handleAssign = () => {
    if (selectedCase) {
      onAssign(selectedCase.id);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Case Assignment
      </Typography>

      {currentCaseFile && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Currently Assigned To:
          </Typography>
          <Chip
            icon={<Link />}
            label={`Case ${currentCaseFile.id} - ${currentCaseFile.subject}`}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Autocomplete
          fullWidth
          value={selectedCase}
          onChange={(_, newValue) => setSelectedCase(newValue)}
          inputValue={searchQuery}
          onInputChange={(_, newInputValue) => setSearchQuery(newInputValue)}
          options={[]} // Would be populated by searchCases
          getOptionLabel={(option: CaseFile) => 
            `${option.id} - ${option.subject} (${option.employer})`
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Cases"
              variant="outlined"
              size="small"
            />
          )}
        />
        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={!selectedCase}
          sx={{ mt: 2 }}
          fullWidth
        >
          Assign to Case
        </Button>
      </Box>
    </Paper>
  );
}; 