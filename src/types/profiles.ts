// Base interface for shared fields across profiles
interface BaseProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive';
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
  };
}

export interface Employee extends BaseProfile {
  type: 'employee';
  employeeId: string;
  department: string;
  position: string;
  employmentStatus: EmploymentStatus;
  employmentDetails: {
    startDate: Date;
    regularHours: number;
    supervisor: string;
    classification: string;
  };
  policyDetails?: {
    policyNumber: string;
    coverage: string[];
  };
}

export interface Employer extends BaseProfile {
  type: 'employer';
  companyName: string;
  industry: string;
  organizationDetails: {
    size: string;
    locations: Address[];
    mainContact: string;
  };
  policyDetails: {
    policyNumber: string;
    coverageType: string;
    startDate: Date;
    renewalDate: Date;
  };
}

export interface PolicyHolder extends BaseProfile {
  type: 'policyholder';
  policyNumber: string;
  policies: Array<{
    type: string;
    number: string;
    startDate: Date;
    endDate?: Date;
    coverage: string[];
    beneficiaries: string[];
  }>;
  relationships: Array<{
    type: string;
    entityId: string;
    role: string;
  }>;
} 