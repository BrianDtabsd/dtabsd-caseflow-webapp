import { 
  Paper, Grid, Typography, Box, Button, Autocomplete, TextField as MuiTextField 
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidationTextField } from '../common/FormValidation/ValidationTextField';
import { SelectField } from '../common/SelectField';
import { Employee } from '../../types/profiles';
import { validationRules } from '../../utils/validationRules';
import { employeeTableConfig } from '../../types/tableConfigs';
import { generateClient, GraphQLResult } from 'aws-amplify/api';
import { createEmployee, updateEmployee } from '../../graphql/mutations/employee';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEmployee } from '../../graphql/queries/employee';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import debounce from 'lodash/debounce';
import { UpdateEmployeeInput, CreateEmployeeInput } from '../../API';

interface EmployeeProfileProps {
  initialData?: Employee;
  onSubmit?: (data: Employee) => void;
}

const client = generateClient();

const darkFieldStyle = {
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: '#48AFB1',
      boxShadow: '0 0 5px rgba(72, 175, 177, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff79c6',
      boxShadow: '0 0 10px rgba(255, 121, 198, 0.4)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
  },
  '& .MuiSelect-select': {
    color: '#FFFFFF',
  },
};

// Add complete list of states
const states = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

// Add complete list of provinces
const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' }
];

export const EmployeeProfile = ({ initialData, onSubmit }: EmployeeProfileProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const methods = useForm<Employee>({
    defaultValues: initialData,
  });
  const { searchAddress } = useAddressSearch();
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await client.graphql({
          query: getEmployee,
          variables: { id }
        });
        
        const employeeData = (response as GraphQLResult<any>).data?.getEmployee;
        if (!employeeData) {
          throw new Error('Employee not found');
        }
        methods.reset(employeeData);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError(err instanceof Error ? err.message : 'Failed to load employee data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    }
  }, [id, methods]);

  const handleSubmit = async (data: Employee) => {
    try {
      setLoading(true);
      setError(null);

      if (id) {
        // Remove duplicate 'id' from data using destructuring
        const { id: _ignored, ...employeeData } = data;
        const updateInput: UpdateEmployeeInput = {
          id, // Use the id from useParams
          ...employeeData,
        };
        await client.graphql({
          query: updateEmployee,
          variables: { input: updateInput }
        });
      } else {
        const createInput: CreateEmployeeInput = data;
        await client.graphql({
          query: createEmployee,
          variables: { input: createInput }
        });
      }
      
      if (onSubmit) {
        onSubmit(data);
      }
      navigate('/employees');
    } catch (err) {
      console.error('Error saving employee:', err);
      setError('Failed to save employee data');
    } finally {
      setLoading(false);
    }
  };

  // Phone number formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  // Address search handler
  const handleAddressSearch = debounce(async (searchText: string) => {
    if (searchText.length < 3) return;
    setIsSearching(true);
    const results = await searchAddress(searchText);
    setAddressSuggestions(results);
    setIsSearching(false);
  }, 300);

  // Address selection handler
  const handleAddressSelect = (_: any, value: any) => {
    if (!value) return;
    
    methods.setValue('contactInfo.address.street', `${value.address.house_number || ''} ${value.address.road || ''}`.trim());
    methods.setValue('contactInfo.address.city', value.address.city || '');
    methods.setValue('contactInfo.address.state', value.address.state || '');
    methods.setValue('contactInfo.address.postalCode', value.address.postcode || '');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Paper sx={{ 
          p: 3, 
          bgcolor: '#1a1b26', // Darker background
          borderRadius: 2,
          boxShadow: (theme) => `0 0 10px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: 'text.primary',
            mb: 3,
          }}>
            Employee Information
          </Typography>

          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employeeId"
                label="Employee ID"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectField
                name="employmentStatus"
                label="Employee Classification"
                fullWidth
                rules={validationRules.required}
                options={employeeTableConfig.filters?.[0].options || []}
                sx={darkFieldStyle}
              />
            </Grid>

            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.firstName"
                label="First Name"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.lastName"
                label="Last Name"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                mt: 2,
                color: 'text.secondary',
              }}>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.email"
                label="Email"
                type="email"
                fullWidth
                rules={{
                  ...validationRules.required,
                  ...validationRules.email,
                }}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.phone"
                label="Phone"
                fullWidth
                rules={validationRules.phone}
                onChange={(e) => {
                  e.target.value = formatPhoneNumber(e.target.value);
                }}
                placeholder="(123) 456-7890"
                sx={darkFieldStyle}
              />
            </Grid>

            {/* Address Search Autocomplete */}
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={addressSuggestions}
                getOptionLabel={(option) => option.display_name || ''}
                onInputChange={(_, value) => handleAddressSearch(value)}
                onChange={handleAddressSelect}
                loading={isSearching}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Search Address"
                    sx={darkFieldStyle}
                  />
                )}
              />
            </Grid>

            {/* Address Fields */}
            <Grid item xs={12}>
              <ValidationTextField
                name="contactInfo.address.street"
                label="Street Address"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.address.city"
                label="City"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <SelectField
                name="contactInfo.address.state"
                label="Province/State"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
                options={[
                  ...provinces.map(p => ({ value: p.value, label: p.label })),
                  ...states.map(s => ({ value: s.value, label: s.label }))
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.address.postalCode"
                label="Postal Code"
                fullWidth
                rules={validationRules.postalCode}
                sx={darkFieldStyle}
              />
            </Grid>

            {/* Employment Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                mt: 2,
                color: 'text.secondary',
              }}>
                Employment Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="department"
                label="Department"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="position"
                label="Position"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.startDate"
                label="Start Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.regularHours"
                label="Weekly Hours"
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*'
                }}
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.supervisor"
                label="Supervisor"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.classification"
                label="Job Classification"
                fullWidth
                rules={validationRules.required}
                sx={darkFieldStyle}
              />
            </Grid>

            {/* Policy Details */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ 
                mt: 2,
                color: 'text.secondary',
              }}>
                Policy Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="policyDetails.policyNumber"
                label="Policy Number"
                fullWidth
                sx={darkFieldStyle}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {id ? 'Update Employee' : 'Create Employee'}
            </Button>
          </Box>
        </Paper>
      </form>
    </FormProvider>
  );
};
