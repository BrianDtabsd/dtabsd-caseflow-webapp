import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PrintOptionsProps {
  orientation: 'portrait' | 'landscape';
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
  paperSize: 'letter' | 'legal' | 'a4';
  setPaperSize: (size: 'letter' | 'legal' | 'a4') => void;
}

export const PrintOptions = ({ 
  orientation, 
  setOrientation, 
  paperSize, 
  setPaperSize 
}: PrintOptionsProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        {t('print.options')}
      </Typography>
      <FormControl component="fieldset" sx={{ mr: 4 }}>
        <Typography variant="caption">{t('print.orientation')}</Typography>
        <RadioGroup
          row
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
        >
          <FormControlLabel 
            value="portrait" 
            control={<Radio size="small" />} 
            label={t('print.portrait')}
          />
          <FormControlLabel 
            value="landscape" 
            control={<Radio size="small" />} 
            label={t('print.landscape')}
          />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <Typography variant="caption">{t('print.paperSize')}</Typography>
        <RadioGroup
          row
          value={paperSize}
          onChange={(e) => setPaperSize(e.target.value as 'letter' | 'legal' | 'a4')}
        >
          <FormControlLabel 
            value="letter" 
            control={<Radio size="small" />} 
            label="Letter"
          />
          <FormControlLabel 
            value="legal" 
            control={<Radio size="small" />} 
            label="Legal"
          />
          <FormControlLabel 
            value="a4" 
            control={<Radio size="small" />} 
            label="A4"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}; 