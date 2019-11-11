import gql from 'graphql-tag';

export default gql `
  mutation AddressCreate($input: CreateAddressInput!) {
    createAddress(input: $input) {
      id
    }
  }
`;
