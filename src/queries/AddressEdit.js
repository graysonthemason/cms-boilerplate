import gql from 'graphql-tag';

export default gql `
query AddressEdit($id: Int!) {
  address: getAddress(id: $id) {
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
