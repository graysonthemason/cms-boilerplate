import gql from 'graphql-tag';

export default gql `
  mutation TransEmailCreate($name: String!) {
    createTransEmail(name: $name) {
      id
    }
  }
`;
