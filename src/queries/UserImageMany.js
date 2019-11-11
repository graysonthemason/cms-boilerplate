import gql from 'graphql-tag';

export default gql `
{
  allUserImages {
    id
		url
    user {id}
		public_id
	}}
	`
