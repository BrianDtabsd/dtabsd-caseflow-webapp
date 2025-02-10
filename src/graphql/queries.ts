/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getTodo = /* GraphQL */ `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;

export const listFollowUpsWithDetails = /* GraphQL */ `
  query ListFollowUpsWithDetails(
    $filter: ModelFollowUpFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFollowUps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        reason
        description
        dueDate
        status
        priority
        assignedTo
        reassignedTo
        reassignedReason
        notes
        sequence
        sequenceTotal
        isLastInSequence
        color
        displayOrder
        createdAt
        completedAt
        case {
          id
          caseNumber
          title
          type
          status
          priority
          employer {
            name
          }
          caseManager {
            firstName
            lastName
          }
        }
      }
      nextToken
    }
  }
`;
