import {hash} from 'bcrypt'
import {sign} from 'jsonwebtoken'
import {Arg, Authorized, Ctx, Mutation, Resolver} from 'type-graphql'
import {getConnection, Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import User from '../../../entities/User'
import Name from '../../../entities/Name'
import SignupInputType from '../../../types/inputs/SignupInputType'
import moment = require('moment')
import {Context} from '../../../types/context'
import {AuthenticationError} from 'apollo-server-koa'

/**
 * Mutations relating to session
 */
@Resolver()
export default class NameMutationsResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Name) private readonly nameRepository: Repository<Name>
  ) {}

  @Authorized()
  @Mutation((returns) => Boolean)
  async changeName(
    @Arg('input') input: String,
    @Ctx() ctx: Context
  ): Promise<Boolean> {
    if (!ctx.user) {
      throw new AuthenticationError('Not logged in..?')
    }

    const alreadyUsedName = await this.nameRepository.findOne({
      where: {
        user: ctx.user,
        string: input.toLowerCase(),
      },
    })

    if (alreadyUsedName) {
      throw new Error('You have used this name in the past')
    }

    const nameCurrentlyInUse = await this.nameRepository.findOne({
      where: {
        string: input.toLowerCase(),
        revoked: false,
      },
    })

    if (nameCurrentlyInUse) {
      throw new Error('Someone else currently has this name sorry')
    }

    const connection = getConnection()
    const queryRunner = connection.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      await this.nameRepository.update(
        {
          user: ctx.user,
        },
        {
          revoked: true,
          revokedAt: new Date(),
        }
      )

      let name = new Name({
        string: input.toLowerCase(),
        user: ctx.user,
        expiresAt: new Date(moment().endOf('day').add(1, 'y').toISOString()),
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

    return true
  }
}
