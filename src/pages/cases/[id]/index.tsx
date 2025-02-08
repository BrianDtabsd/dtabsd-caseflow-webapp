import { useParams } from 'react-router-dom';
import { MainLayout } from '../../../layouts/MainLayout';
import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';

// Import your existing components with full paths
import { CaseList } from '../../../components/cases/CaseList/CaseList';
import { DiagnosisForm } from '../../../components/medical/Diagnosis/DiagnosisForm';
import { TreatmentPlanForm } from '../../../components/medical/TreatmentPlan/TreatmentPlanForm';
import { DocumentManager } from '../../../components/documents/DocumentManager/DocumentManager';
import { GRTWPlan } from '../../../components/rtw/GRTWPlan/GRTWPlan';
import { JobInfo } from '../../../components/employment/JobInfo/JobInfo';
import { JobDemands } from '../../../components/employment/JobDemands/JobDemands';

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
      id={`case-tabpanel-${index}`}
      aria-labelledby={`case-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CaseDetail() {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <MainLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            aria-label="case details tabs"
          >
            <Tab label="Overview" />
            <Tab label="Medical" />
            <Tab label="Documents" />
            <Tab label="RTW" />
            <Tab label="Employment" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <CaseList />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DiagnosisForm />
            <TreatmentPlanForm />
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <DocumentManager />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <GRTWPlan />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <JobInfo />
            <JobDemands />
          </Box>
        </TabPanel>
      </Box>
    </MainLayout>
  );
} 