import gql from 'graphql-tag';

export default gql `
{
  me {
    user {
      id
      email
      firstName
      lastName
      fullName
      demoMode
      hasCurrentBookings
      profileImgUrl
      spotifyAccessToken
      spotifyRefreshToken
      spotifyRefreshExpires
      curAccount {
        roles
        account {
          id
          name
          contracts {
            allCities
          }
        }
      }
      userConfigOptions {
        configOption {
          id
        }
        config {
          id
        }
      }
    }
  }
}
`
