import gql from 'graphql-tag';

export default gql `
query AddressList($pagination: Pagination, $sort: Sort, $filter: Filter) {
  allAddresses: addressFeed(pagination: $pagination, sort: $sort, filter: $filter) {
  	rows {
			id
  		address1
			address2
			city
			zipcode
			state
			country
			latitude
			longitude
		} 
		count
	}
}`
