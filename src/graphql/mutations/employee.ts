import { graphql } from 'aws-amplify/api';

export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      employeeId
      firstName
      lastName
      department
      position
      employmentStatus
      contactInfo {
        email
        phone
        address {
          street
          city
          state
          postalCode
        }
      }
      employmentDetails {
        startDate
        regularHours
        supervisor
        classification
      }
      policyDetails {
        policyNumber
        coverage
      }
      createdAt
      updatedAt
    }
  }
`;

export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
      employeeId
      firstName
      lastName
      department
      position
      employmentStatus
      contactInfo {
        email
        phone
        address {
          street
          city
          state
          postalCode
        }
      }
      employmentDetails {
        startDate
        regularHours
        supervisor
        classification
      }
      policyDetails {
        policyNumber
        coverage
      }
      createdAt
      updatedAt
    }
  }
`;

export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee($input: DeleteEmployeeInput!) {
    deleteEmployee(input: $input) {
      id
      employeeId
    }
  }
`; 