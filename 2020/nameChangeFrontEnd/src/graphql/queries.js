import gql from 'graphql-tag'

export const GET_NAMES = gql`
  query GET_NAMES {
    upcomingNames {
      id
      string
      expiresAt
    }
  }
`
export const GET_ME = gql`
  query GET_ME {
    me {
      id
      email
      currentName {
        string
      }
      pastNames {
        id
        string
        revokedAt
      }
    }
  }
`
