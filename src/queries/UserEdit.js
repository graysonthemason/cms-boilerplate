import gql from 'graphql-tag';

export default gql `
query UserEdit($id: Int!) {
  user: getUser(id: $id) {
    id
      firstName
      lastName
      fullName
      email
      title
      confirmationDt
      demoMode
      suspended
      primaryImage {id url public_id}
    images {id url public_id primaryFlg}
    image_ids
  }
}`
