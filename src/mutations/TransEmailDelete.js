import gql from 'graphql-tag';

export default gql `
  mutation TransEmailDelete($id: Int!) {
    deleteTransEmail(id: $id) {
			id
		}
  }
`;
