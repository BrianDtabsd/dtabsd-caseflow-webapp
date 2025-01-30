export interface CaseRelationships {
  caseId: string;
  relationships: Array<{
    type: 'employee' | 'employer' | 'policyholder';
    id: string;
    role: 'primary' | 'secondary' | 'related';
    relationshipType: string;
    startDate: Date;
    endDate?: Date;
    status: 'active' | 'inactive';
  }>;
}

// Example of how relationships can be configured for different case types
export const relationshipConfigs = {
  disability: {
    required: ['employee', 'employer'],
    optional: ['policyholder'],
    roles: {
      employee: ['claimant'],
      employer: ['current', 'previous'],
      policyholder: ['primary', 'dependent']
    }
  },
  // Can be extended for other case types
  workersComp: {
    required: ['employee', 'employer'],
    optional: [],
    roles: {
      employee: ['worker'],
      employer: ['current']
    }
  }
}; 