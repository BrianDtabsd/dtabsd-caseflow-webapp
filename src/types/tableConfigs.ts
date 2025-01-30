import { TableConfig } from './caseManagement';

export const employeeTableConfig: TableConfig = {
  columns: [
    {
      field: 'employeeId',
      header: 'Employee ID',
      width: 120,
      sortable: true,
      filterable: true,
    },
    {
      field: 'lastName',
      header: 'Last Name',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'firstName',
      header: 'First Name',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'department',
      header: 'Department',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'position',
      header: 'Position',
      width: 150,
      filterable: true,
    },
    {
      field: 'employmentStatus',
      header: 'Status',
      width: 120,
      sortable: true,
      filterable: true,
    },
    {
      field: 'regularHours',
      header: 'Weekly Hours',
      width: 120,
      formatter: (value) => `${value} hrs`,
    }
  ],
  defaultSort: { field: 'lastName', direction: 'asc' },
  filters: [
    {
      field: 'employmentStatus',
      type: 'select',
      options: [
        { value: 'regular', label: 'Regular' },
        { value: 'casual', label: 'Casual' },
        { value: 'temporary', label: 'Temporary' },
        { value: 'lay-off', label: 'Lay-off' },
        { value: 'terminated', label: 'Terminated' },
        { value: 'retired', label: 'Retired' }
      ]
    },
    {
      field: 'department',
      type: 'text'
    }
  ]
};

export const employerTableConfig: TableConfig = {
  columns: [
    {
      field: 'companyName',
      header: 'Company Name',
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: 'industry',
      header: 'Industry',
      width: 150,
      filterable: true,
    },
    {
      field: 'organizationDetails.size',
      header: 'Size',
      width: 120,
    },
    {
      field: 'policyDetails.policyNumber',
      header: 'Policy Number',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'status',
      header: 'Status',
      width: 120,
      sortable: true,
      filterable: true,
    },
    {
      field: 'organizationDetails.mainContact',
      header: 'Main Contact',
      width: 180,
    }
  ],
  defaultSort: { field: 'companyName', direction: 'asc' },
  filters: [
    {
      field: 'status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    },
    {
      field: 'industry',
      type: 'text'
    }
  ]
};

export const policyHolderTableConfig: TableConfig = {
  columns: [
    {
      field: 'policyNumber',
      header: 'Policy Number',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'contactInfo.lastName',
      header: 'Last Name',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'contactInfo.firstName',
      header: 'First Name',
      width: 150,
      sortable: true,
      filterable: true,
    },
    {
      field: 'policies[0].type',
      header: 'Policy Type',
      width: 150,
      filterable: true,
    },
    {
      field: 'status',
      header: 'Status',
      width: 120,
      sortable: true,
      filterable: true,
    }
  ],
  defaultSort: { field: 'contactInfo.lastName', direction: 'asc' },
  filters: [
    {
      field: 'status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    }
  ]
}; 