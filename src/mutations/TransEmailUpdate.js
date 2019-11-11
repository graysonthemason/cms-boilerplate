import gql from 'graphql-tag';

export default gql `
  mutation UpdateTransEmail($input: UpdateTransEmailInput!) {
    updateTransEmail(input: $input) {
      id
    }
  }
`;
