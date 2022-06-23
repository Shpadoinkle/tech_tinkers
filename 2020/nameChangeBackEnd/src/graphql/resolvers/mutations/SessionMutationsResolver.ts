import {hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {Arg, Mutation, Resolver} from 'type-graphql'
import {getConnection, Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import User from '../../../entities/User'
import Name from '../../../entities/Name'
import SignupInputType from '../../../types/inputs/SignupInputType'
import moment = require('moment')

/**
 * Mutations relating to session
 */
@Resolver()
export default class SessionMutationsResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Name) private readonly nameRepository: Repository<Name>
  ) {}

  @Mutation((returns) => String)
  async signup(@Arg('input') input: SignupInputType): Promise<String> {
    const email = input.email.trim().toLowerCase()
    const passwordHash = await hash(input.password, 10)

    let emailAlreadyExists = await this.userRepository.findOne({
      where: {
        email: input.email.trim().toLowerCase(),
      },
    })

    if (emailAlreadyExists) {
      throw new Error('A user with that email already exists')
    }

    let nameAlreadyExists = await this.nameRepository.findOne({
      where: {
        string: input.name.toLowerCase(),
        revoked: false,
      },
    })

    if (nameAlreadyExists) {
      throw new Error('A citizen with that name already exists')
    }

    let user
    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      user = new User({email, passwordHash})
      await this.userRepository.save(user)
      let date = new Date(moment().endOf('day').add(1, 'y').toISOString())
      let name = new Name({
        string: input.name.toLowerCase(),
        user,
        expiresAt: date,
      })
      await this.nameRepository.save(name)
      await queryRunner.commitTransaction()
      await queryRunner.release()
    } catch (e) {
      console.log(e)
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      throw new Error('User creation failed')
    }

    const token = sign({user}, process.env.JWT_SECRET, {
      noTimestamp: true,
    })

    return token
  }
}
