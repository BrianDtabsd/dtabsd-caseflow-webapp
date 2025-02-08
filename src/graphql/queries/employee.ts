
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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

export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: EmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`; 