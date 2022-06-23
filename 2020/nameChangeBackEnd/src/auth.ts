import {AuthChecker} from 'type-graphql'
import {Context} from './types/context'

export const authChecker: AuthChecker<Context> = (
  {root, args, context, info},
  roles
) => {
  // here you can read user from context
  // and check his permission in db against `roles` argument
  // that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

  //console.log(root, args, context, info);
  console.log('root', root)
  console.log('args', args)
  console.log('context', context)
  // console.log("info", info);

  if (!context.user) {
    return false
  }

  // if just normal auth, return true here
  if (roles.length === 0 && context.user && context.user.id) {
    return true
  }

  console.log('roles required', roles)

  return true // or false if access denied
}
