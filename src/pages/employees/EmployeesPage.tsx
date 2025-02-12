import { Address } from "cluster";

export type EmploymentStatus = 
  | 'regular'
  | 'casual' 
  | 'temporary'
  | 'lay-off'
  | 'terminated'
  | 'retired';

export interface EmployeesPage {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  department: string;
  position: string;
  status: EmploymentStatus;
  contactInfo: {
    email: string;
    phone: string;
    address: Address;
  };
  employmentDetails: {
    startDate: Date;
    regularHours: number;  // Weekly hours: 37.5, 28, 40 etc.
    supervisor: string;
    classification: string;  // Instead of 'type' - job classification/category
  };
}

// For the table columns
export const employeeColumns = [
  { field: 'employeeId', headerName: 'ID', width: 100 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'position', headerName: 'Position', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  { 
    field: 'regularHours', 
    headerName: 'Weekly Hours', 
    width: 130,
    valueFormatter: (params: { value: any; }) => `${params.value} hrs`
  },
]; 