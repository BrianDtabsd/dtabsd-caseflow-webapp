import { Dialog, DialogTitle, DialogContent, IconButton, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { PrintView } from './PrintView';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PrintOptions } from './PrintOptions';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

interface PreviewDialogProps {
  open: boolean;
  onClose: () => void;
  data: {
    weeks: WeekPlan[];
    startDate: Date;
    endDate: Date;
    supervisorInfo: {
      name: string;
      approvalDate: Date;
    };
  };
}

export const PreviewDialog = ({ open, onClose, data }: PreviewDialogProps) => {
  const { i18n, t } = useTranslation();
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [paperSize, setPaperSize] = useState<'letter' | 'legal' | 'a4'>('letter');

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {t('preview.title')}
          <ToggleButtonGroup
            value={i18n.language}
            exclusive
            onChange={(_, newLang) => newLang && i18n.changeLanguage(newLang)}
            size="small"
          >
            <ToggleButton value="en">EN</ToggleButton>
            <ToggleButton value="fr">FR</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PrintOptions
          orientation={orientation}
          setOrientation={setOrientation}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
        />
        <Box sx={{ 
          '@media print': {
            size: paperSize,
            orientation: orientation,
          }
        }}>
          <PrintView {...data} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.print()} startIcon={<PrintIcon />}>
          {t('print.button')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 