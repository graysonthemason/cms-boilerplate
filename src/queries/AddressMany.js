import gql from 'graphql-tag';

export default gql `
	{
		allAddresses {
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
	}`
