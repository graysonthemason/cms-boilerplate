import gql from 'graphql-tag';

export default gql `
  mutation UserImageCreate($input: [UserImageInput!]) {
    createUserImage(input: $input) {
      id
			url
			public_id
			user{images{id}}
    }
  }
`;
