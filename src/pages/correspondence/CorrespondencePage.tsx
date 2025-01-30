import React from 'react';
import {
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import { DocumentViewer } from '../../components/correspondence/documents/DocumentViewer/DocumentViewer';
import { DocumentActions } from '../../components/correspondence/documents/DocumentViewer/DocumentActions';
import { DocumentAssignment } from '../../components/correspondence/documents/DocumentViewer/DocumentAssignment';
import { TemplateList } from '../../components/correspondence/templates/TemplateLibrary/TemplateList';
import { AITemplateEditor } from '../../components/correspondence/templates/TemplateEditor/AITemplateEditor';
import { AITemplateGenerator } from '../../components/correspondence/templates/TemplateGenerator/AITemplateGenerator';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`correspondence-tabpanel-${index}`}
      aria-labelledby={`correspondence-tab-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );
};

export const CorrespondencePage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Correspondence
        </Typography>
        <Paper>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="correspondence tabs"
          >
            <Tab label="Documents" />
            <Tab label="Templates" />
            <Tab label="Create New" />
          </Tabs>
          <Divider />

          <TabPanel value={activeTab} index={0}>
            {/* Documents Tab */}
            <Box sx={{ mb: 3 }}>
              <DocumentViewer
                document={{
                  id: '1',
                  content: 'Sample document content',
                  type: 'medical',
                  filename: 'sample.doc'
                }}
                onAnalysisComplete={(results) => {
                  console.log('Analysis results:', results);
                }}
              />
              <Box sx={{ mt: 2 }}>
                <DocumentActions
                  documentId="1"
                  onPrint={() => {}}
                  onDownload={() => {}}
                  onMove={() => {}}
                  onSave={() => {}}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <DocumentAssignment
                  documentId="1"
                  onAssign={(caseFileId) => {
                    console.log('Assigning to case:', caseFileId);
                  }}
                />
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {/* Templates Tab */}
            <TemplateList
              templates={[
                {
                  id: '1',
                  name: 'Medical Report Template',
                  category: 'Medical',
                  lastModified: new Date(),
                  aiTags: ['Medical', 'Report', 'Standard']
                }
              ]}
              onEdit={() => {}}
              onCopy={() => {}}
              onDelete={() => {}}
            />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            {/* Create New Tab */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <AITemplateEditor
                  onSave={(content, fields) => {
                    console.log('Saving template:', { content, fields });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AITemplateGenerator
                  templateId="1"
                  caseData={{
                    subject: {
                      name: 'John Doe',
                      address: '123 Main St'
                    },
                    employer: {
                      name: 'ACME Corp',
                      address: '456 Business Ave'
                    },
                    caseDetails: {
                      id: 'CASE-001',
                      type: 'Medical Leave'
                    }
                  }}
                  onGenerate={(content) => {
                    console.log('Generated content:', content);
                  }}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}; 