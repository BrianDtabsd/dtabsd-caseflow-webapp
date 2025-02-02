import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Divider,
  List,
  IconButton,
  InputBase,
  Collapse,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Stack,
  Chip,
  ListItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  FilterList as FilterIcon,
  Description as DocIcon,
  MedicalInformation as MedicalIcon,
  Assignment as AssessmentIcon,
  KeyboardReturn as RTWIcon,
} from '@mui/icons-material';
import DocumentListItem from './documents/DocumentListItem';
import DocumentUpload from './documents/DocumentUpload';
import BaseWidget from './BaseWidget';

// Extended mock data
const MOCK_DOCUMENTS = [
  {
    id: '1',
    title: 'Medical Report - Initial Assessment',
    type: 'medical',
    subjectName: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    caseId: 'CASE-2024-001',
    caseManager: 'Sarah Wilson',
    createdAt: new Date('2024-01-30'),
    tags: ['Initial'],
  },
  {
    id: '2',
    title: 'RTW Plan - Phase 1',
    type: 'rtw',
    subjectName: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    caseId: 'CASE-2024-002',
    caseManager: 'Mike Brown',
    createdAt: new Date('2024-01-29'),
    tags: ['Active'],
  },
  {
    id: '3',
    title: 'Functional Assessment Report',
    type: 'assessment',
    subjectName: 'Mike Johnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    caseId: 'CASE-2024-003',
    caseManager: 'Sarah Wilson',
    createdAt: new Date('2024-01-28'),
    tags: ['Complete'],
  },
] as const;

interface SearchFilters {
  query: string;
  type: string;
  dateFrom: string;
  dateTo: string;
  caseId: string;
  firstName: string;
  lastName: string;
  caseManager: string;
}

const DocumentsWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    caseId: '',
    firstName: '',
    lastName: '',
    caseManager: '',
  });

  const handleFilterChange = (field: keyof SearchFilters) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      caseId: '',
      firstName: '',
      lastName: '',
      caseManager: '',
    });
  };

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesQuery = !filters.query || 
      doc.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      doc.subjectName.toLowerCase().includes(filters.query.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));

    const matchesType = !filters.type || doc.type === filters.type;
    const matchesCaseId = !filters.caseId || doc.caseId.includes(filters.caseId);
    const matchesFirstName = !filters.firstName || 
      doc.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchesLastName = !filters.lastName || 
      doc.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchesCaseManager = !filters.caseManager || 
      doc.caseManager.toLowerCase().includes(filters.caseManager.toLowerCase());
    
    const docDate = doc.createdAt.getTime();
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom).getTime() : 0;
    const toDate = filters.dateTo ? new Date(filters.dateTo).getTime() : Infinity;
    const matchesDate = docDate >= fromDate && docDate <= toDate;

    return matchesQuery && matchesType && matchesCaseId && matchesFirstName && 
           matchesLastName && matchesCaseManager && matchesDate;
  });

  const handleOpenDocument = (id: string) => {
    console.log('Opening document:', id);
    // Will implement document opening logic
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'medical':
        return <MedicalIcon sx={{ color: '#64ffda' }} />;
      case 'rtw':
        return <RTWIcon sx={{ color: '#bd93f9' }} />;
      case 'assessment':
        return <AssessmentIcon sx={{ color: '#EC4899' }} />;
      default:
        return <DocIcon sx={{ color: '#f8f8f2' }} />;
    }
  };

  return (
    <BaseWidget
      title="Documents"
      subtitle={`${filteredDocs.length} documents found`}
      headerActions={
        <IconButton
          size="small"
          onClick={() => setSearchOpen(!searchOpen)}
          sx={{ 
            color: searchOpen ? '#64ffda' : 'rgba(248, 248, 242, 0.7)',
            transition: 'all 0.2s ease',
            '&:hover': { 
              color: '#64ffda',
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      }
    >
      {/* Search Bar */}
      <Box
        sx={{
          height: searchOpen ? 'auto' : 0,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          mb: searchOpen ? 2 : 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(45, 45, 45, 0.8)',
            borderRadius: '8px',
            p: 1,
            border: '1px solid rgba(100, 255, 218, 0.1)',
            '&:focus-within': {
              borderColor: '#64ffda',
              boxShadow: '0 0 12px rgba(100, 255, 218, 0.2)',
            },
          }}
        >
          <SearchIcon sx={{ color: 'rgba(248, 248, 242, 0.7)', mr: 1 }} />
          <InputBase
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              flex: 1,
              color: '#f8f8f2',
              '& input::placeholder': {
                color: 'rgba(248, 248, 242, 0.5)',
                opacity: 1,
              },
            }}
          />
        </Box>
      </Box>

      {/* Widget Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Documents & Templates</Typography>
        <Box>
          <IconButton 
            size="small" 
            title="Filters"
            onClick={() => setFiltersOpen(!filtersOpen)}
            color={activeFiltersCount > 0 ? "primary" : "default"}
          >
            <FilterIcon />
            {activeFiltersCount > 0 && (
              <Chip
                label={activeFiltersCount}
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  height: 16,
                  fontSize: '0.65rem',
                }}
              />
            )}
          </IconButton>
          <IconButton 
            size="small" 
            title="Upload Document"
            onClick={() => setUploadOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Collapse in={searchOpen}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {/* Basic Search */}
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <SearchIcon sx={{ p: '10px', opacity: 0.5 }} />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search documents..."
              value={filters.query}
              onChange={handleFilterChange('query')}
            />
          </Paper>

          {/* Advanced Filters */}
          <Collapse in={filtersOpen}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl size="small" fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Document Type"
                  onChange={handleFilterChange('type')}
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="rtw">RTW</MenuItem>
                  <MenuItem value="assessment">Assessment</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="From Date"
                  type="date"
                  value={filters.dateFrom}
                  onChange={handleFilterChange('dateFrom')}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  size="small"
                  label="To Date"
                  type="date"
                  value={filters.dateTo}
                  onChange={handleFilterChange('dateTo')}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>

              <TextField
                size="small"
                label="Case ID"
                value={filters.caseId}
                onChange={handleFilterChange('caseId')}
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  label="First Name"
                  value={filters.firstName}
                  onChange={handleFilterChange('firstName')}
                />
                <TextField
                  size="small"
                  label="Last Name"
                  value={filters.lastName}
                  onChange={handleFilterChange('lastName')}
                />
              </Stack>

              <TextField
                size="small"
                label="Case Manager"
                value={filters.caseManager}
                onChange={handleFilterChange('caseManager')}
              />

              {activeFiltersCount > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton 
                    size="small" 
                    onClick={clearFilters}
                    title="Clear all filters"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Stack>
          </Collapse>
        </Stack>
      </Collapse>

      <Divider />

      {/* Quick Actions */}
      <Box sx={{ py: 1 }}>
        <Typography variant="subtitle2" color="primary">
          Quick Actions
        </Typography>
        <List dense>
          <Typography variant="body2">Create RTW Letter</Typography>
          <Typography variant="body2">Upload Medical Document</Typography>
          <Typography variant="body2">Generate Report</Typography>
        </List>
      </Box>

      <Divider />

      {/* Recent Documents */}
      <Box sx={{ py: 1, flex: 1, overflow: 'auto' }}>
        <Typography variant="subtitle2" color="primary">
          Recent Documents
        </Typography>
        <List dense>
          {filteredDocs.map((doc) => (
            <DocumentListItem
              key={doc.id}
              document={doc}
              onOpen={handleOpenDocument}
            />
          ))}
        </List>
      </Box>

      {/* Upload Dialog */}
      <DocumentUpload 
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </BaseWidget>
  );
};

export default DocumentsWidget; 