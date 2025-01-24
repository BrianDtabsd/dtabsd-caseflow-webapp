import { Grid, TextField } from '@mui/material';

interface ContactInfoProps {
  required?: boolean;
}

export const ContactInfo = ({ required = false }: ContactInfoProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="First Name"
          fullWidth
          required={required}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Last Name"
          fullWidth
          required={required}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required={required}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Phone"
          fullWidth
          required={required}
        />
      </Grid>
    </Grid>
  );
}; 