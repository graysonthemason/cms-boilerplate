import gql from 'graphql-tag';

export default gql `
query UserList($pagination: Pagination, $sort: Sort, $filter: Filter) {
  allUsers: userFeed(pagination: $pagination, sort: $sort, filter: $filter) {
    rows {
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
    count
  }
}
`;
