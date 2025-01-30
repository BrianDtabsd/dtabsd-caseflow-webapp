import { Grid, Paper, Typography, Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import { DocumentUpload } from '../DocumentUpload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`document-tabpanel-${index}`}
      aria-labelledby={`document-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const DocumentManager = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Document Management
      </Typography>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        aria-label="Document management tabs"
      >
        <Tab label="Incoming Documents" id="document-tab-0" aria-controls="document-tabpanel-0" />
        <Tab label="Templates" id="document-tab-1" aria-controls="document-tabpanel-1" />
        <Tab label="Invoices" id="document-tab-2" aria-controls="document-tabpanel-2" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DocumentUpload 
              onUpload={(files) => {
                // Handle document upload and AI processing
              }}
              acceptedTypes={['application/pdf', 'image/*']}
              maxSize={10000000} // 10MB
            />
          </Grid>
          {/* Document list would go here */}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Template management interface */}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Invoice management interface */}
      </TabPanel>
    </Paper>
  );
}; 