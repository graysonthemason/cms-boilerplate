import gql from 'graphql-tag';

export default gql `
  mutation UpdateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input) {
      id
    }
  }
`;
