import { graphql } from 'aws-amplify/api';

export const listFollowUps = /* GraphQL */ `
  query ListFollowUps(
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowUps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        dueDate
        status
        priority
        assignedTo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`; 