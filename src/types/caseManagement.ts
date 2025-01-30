// Reusable field configurations that can be customized per use case
export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'number' | 'multiline' | 'file';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: any;
}

// Profile field configurations that can be reused/modified
export const profileFields: Record<string, FieldConfig[]> = {
  employee: [
    {
      name: 'employeeId',
      label: 'Employee ID',
      type: 'text',
      required: true,
    },
    {
      name: 'employmentStatus',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'regular', label: 'Regular' },
        { value: 'casual', label: 'Casual' },
        { value: 'temporary', label: 'Temporary' },
        // ...etc
      ],
    },
    // ...more fields
  ],
  employer: [
    // Employer specific fields
  ],
  policyholder: [
    // Policyholder specific fields
  ]
};

// Relationship mappings between entities
export interface EntityRelationship {
  sourceType: 'employee' | 'employer' | 'policyholder';
  targetType: 'employee' | 'employer' | 'policyholder';
  relationshipType: string;
  metadata?: Record<string, any>;
}

// Table configurations that can be customized
export interface TableConfig {
  columns: Array<{
    field: string;
    header: string;
    width?: number;
    sortable?: boolean;
    filterable?: boolean;
    formatter?: (value: any) => string;
  }>;
  defaultSort?: { field: string; direction: 'asc' | 'desc' };
  filters?: Array<{
    field: string;
    type: 'text' | 'select' | 'date' | 'number';
    options?: Array<{ value: string; label: string }>;
  }>;
} 