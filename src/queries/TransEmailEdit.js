import gql from 'graphql-tag';

export default gql `
query TransEmailEdit($id: Int!) {
  transEmail: getTransEmail(id: $id) {
    id
  	name
		description
		sendgridTemplateId
		roles
  	inactive
		internalBccFlg
  	updatedAt
  	createdAt
  }
}`
