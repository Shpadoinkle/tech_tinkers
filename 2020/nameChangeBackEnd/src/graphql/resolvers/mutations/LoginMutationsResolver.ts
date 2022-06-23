import {compare} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {Arg, Mutation, Resolver} from 'type-graphql'
import {Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import User from '../../../entities/User'
import LoginInputType from '../../../types/inputs/LoginInputType'

/**
 * Mutations relating to Logins
 */
@Resolver()
export default class LoginMutationsResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Mutation(/* istanbul ignore next */ (returns) => String)
  async passwordLogin(
    @Arg('input', {nullable: false, validate: true}) input: LoginInputType
  ): Promise<string> {
    const user = await this.userRepository.findOne({
      where: {
        email: input.email.trim().toLowerCase(),
      },
    })

    if (!user) {
      throw new Error('Incorrect login details')
    }

    const match = await compare(input.password, user.passwordHash)
    if (!match) {
      throw new Error('Incorrect login details')
    }

    const token = sign({user}, process.env.JWT_SECRET, {
      noTimestamp: true,
    })

    return token
  }
}
