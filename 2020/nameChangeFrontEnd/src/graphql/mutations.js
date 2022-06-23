import gql from 'graphql-tag'
import client from '../apollo'

export async function signup(input) {
  return await client.mutate({
    mutation: gql`
      mutation signup($input: SignupInput!) {
        signup(input: $input)
      }
    `,
    variables: {input},
  })
}
export async function login(input) {
  return await client.mutate({
    mutation: gql`
      mutation passwordLogin($input: LoginInput!) {
        passwordLogin(input: $input)
      }
    `,
    variables: {input},
  })
}
export async function changeName(input) {
  return await client.mutate({
    mutation: gql`
      mutation changeName($input: String!) {
        changeName(input: $input)
      }
    `,
    variables: {input},
    refetchQueries: ['GET_ME'],
    awaitRefetchQueries: true,
  })
}
