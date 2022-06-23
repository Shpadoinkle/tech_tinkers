/* istanbul ignore file */
import {Container} from 'typedi'
import {authChecker} from './auth'
import {buildSchema} from 'type-graphql'

// Queries
import UserQueriesResolver from './graphql/resolvers/queries/UserQueriesResolver'
import UserFieldsResolver from './graphql/resolvers/fields/UserFieldsResolver'
import NameQueriesResolver from './graphql/resolvers/queries/NameQueriesResolver'

// Mutations
import LoginMutationsResolver from './graphql/resolvers/mutations/LoginMutationsResolver'
import SessionMutationsResolver from './graphql/resolvers/mutations/SessionMutationsResolver'
import NameMutationsResolver from './graphql/resolvers/mutations/NameMutationsResolver'

// Entities
import User from './entities/User'
import Name from './entities/Name'

export default async function createSchema() {
  await Promise.resolve()
  return buildSchema({
    resolvers: [
      UserFieldsResolver,
      UserQueriesResolver,
      LoginMutationsResolver,
      SessionMutationsResolver,
      NameMutationsResolver,
      NameQueriesResolver,
    ],
    container: Container,
    authChecker,
    validate: true,
  })
}
