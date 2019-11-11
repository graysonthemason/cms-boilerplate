import gql from 'graphql-tag';

export default gql `
  {
    allUsers {
      id
      firstName
      lastName
      fullName
      email
      title
      confirmationDt
      demoMode
      suspended
      primaryImage {id url public_id primaryFlg}
    }
  }
`;
