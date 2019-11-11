import gql from 'graphql-tag';

export default gql `
  mutation UserDelete($id: Int!) {
    deleteUser(id: $id) {
			id
		}
  }
`;
