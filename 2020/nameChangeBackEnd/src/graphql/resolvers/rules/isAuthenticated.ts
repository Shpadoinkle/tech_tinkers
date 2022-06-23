import { rule } from 'graphql-shield'
import { GraphQLResolveInfo } from 'graphql'
import { Context } from '../../interfaces/Context'
import { ArgsDictionary } from 'type-graphql'

export const IsAuthenticatedRule = async (
  parent: object,
  args: ArgsDictionary,
  context: Context,
  info: GraphQLResolveInfo | null
) => {
  return !!context.user
}

export const IsAuthenticated = rule({ cache: 'contextual' })(
  IsAuthenticatedRule
)
