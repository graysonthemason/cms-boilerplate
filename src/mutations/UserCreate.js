import gql from 'graphql-tag';

export default gql `
  mutation UserCreate($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;
