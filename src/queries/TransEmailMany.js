import gql from 'graphql-tag';

export default gql `
{allTransEmails {
  id
  name
	description
	sendgridTemplateId
	roles
  inactive
  internalBccFlg
  updatedAt
  createdAt
}}`
