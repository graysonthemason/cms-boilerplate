import gql from 'graphql-tag';

export default gql `
query TransEmailList($pagination: Pagination, $sort: Sort, $filter: Filter) {
  allTransEmails: transEmailFeed(pagination: $pagination, sort: $sort, filter: $filter) {
  rows {
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
	count
}
}`
