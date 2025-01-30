import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { SelectField } from '../../common/SelectField';
import { useState } from 'react';

export const AddressInfo = () => {
  const [province, setProvince] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvince(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Street Address"
          name="streetAddress"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="City"
          name="city"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectField
          label="Province/State"
          name="province"
          value={province}
          onChange={handleChange}
          title="Select province or state"
          options={[
            { value: 'AB', label: 'Alberta' },
            { value: 'BC', label: 'British Columbia' },
            { value: 'MB', label: 'Manitoba' },
            { value: 'NB', label: 'New Brunswick' },
            { value: 'NL', label: 'Newfoundland and Labrador' },
            { value: 'NS', label: 'Nova Scotia' },
            { value: 'ON', label: 'Ontario' },
            { value: 'PE', label: 'Prince Edward Island' },
            { value: 'QC', label: 'Quebec' },
            { value: 'SK', label: 'Saskatchewan' }
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Postal Code"
          name="postalCode"
        />
      </Grid>
    </Grid>
  );
}; 