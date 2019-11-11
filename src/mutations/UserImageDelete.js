import gql from 'graphql-tag';

export default gql `
  mutation UserImageDelete($id: Int!, $userId: Int!) {
    deleteUserImage(id: $id, userId: $userId) {
      id
			images{id}
    }
  }
`;
