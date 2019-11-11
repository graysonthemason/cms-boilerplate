import gql from 'graphql-tag';

export default gql `
  mutation AddressDelete($id: Int!) {
    deleteAddress(id: $id) {
			id
		}
  }
`;
