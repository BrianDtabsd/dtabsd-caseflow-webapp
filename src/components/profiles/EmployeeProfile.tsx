import { Paper, Grid, Typography, Box, Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { ValidationTextField } from '../common/FormValidation/ValidationTextField';
import { SelectField } from '../common/SelectField';
import { Employee } from '../../types/profiles';
import { validationRules } from '../../utils/validationRules';
import { employeeTableConfig } from '../../types/tableConfigs';
import { generateClient } from 'aws-amplify/api';
import { createEmployee, updateEmployee } from '../../graphql/mutations/employee';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEmployee } from '../../graphql/queries/employee';
import { CreateEmployeeInput, UpdateEmployeeInput, GetEmployeeQuery, CreateEmployeeMutation, UpdateEmployeeMutation } from '../../API';

interface EmployeeProfileProps {
  initialData?: Employee;
  onSubmit?: (data: Employee) => void;
}

const client = generateClient();

export const EmployeeProfile = ({ initialData, onSubmit }: EmployeeProfileProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const methods = useForm<Employee>({
    defaultValues: initialData,
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await client.graphql({
          query: getEmployee,
          variables: { id }
        });
        
        const employeeData = response.data?.getEmployee;
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
        // Update existing employee
        const updateInput: UpdateEmployeeInput = {
          id,
          ...data
        };
        await client.graphql({
          query: updateEmployee,
          variables: { input: updateInput }
        });
      } else {
        // Create new employee
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
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: (theme) => `0 0 10px ${theme.palette.mode === 'dark' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SelectField
                name="employmentStatus"
                label="Employment Status"
                fullWidth
                rules={validationRules.required}
                options={employeeTableConfig.filters?.[0].options || []}
              />
            </Grid>

            {/* Personal Information */}
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.firstName"
                label="First Name"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.lastName"
                label="Last Name"
                fullWidth
                rules={validationRules.required}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.phone"
                label="Phone"
                fullWidth
                rules={validationRules.phone}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <ValidationTextField
                name="contactInfo.address.street"
                label="Street Address"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.address.city"
                label="City"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.address.state"
                label="Province/State"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="contactInfo.address.postalCode"
                label="Postal Code"
                fullWidth
                rules={validationRules.postalCode}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="position"
                label="Position"
                fullWidth
                rules={validationRules.required}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.regularHours"
                label="Weekly Hours"
                type="number"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.supervisor"
                label="Supervisor"
                fullWidth
                rules={validationRules.required}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidationTextField
                name="employmentDetails.classification"
                label="Job Classification"
                fullWidth
                rules={validationRules.required}
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