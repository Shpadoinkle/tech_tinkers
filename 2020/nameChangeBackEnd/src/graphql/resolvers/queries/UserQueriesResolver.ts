import {AuthenticationError} from 'apollo-server-koa'
import {Authorized, Ctx, Query, Resolver} from 'type-graphql'
import {Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import User from '../../../entities/User'
import {Context} from '../../../types/context'

@Resolver(/* istanbul ignore next */ (of) => User)
export default class UserQueriesResolver {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>
  ) {}

  @Authorized()
  @Query(/* istanbul ignore next */ (returns) => User, {nullable: true})
  me(@Ctx() ctx: Context) {
    if (!ctx.user) {
      throw new AuthenticationError('Not logged in..?')
    }

    return ctx.user
  }
}
