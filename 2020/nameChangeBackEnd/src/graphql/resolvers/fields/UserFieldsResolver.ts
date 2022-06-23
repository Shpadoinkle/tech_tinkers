import {Authorized, FieldResolver, Resolver, Root} from 'type-graphql'
import {Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import Name from '../../../entities/Name'
import User from '../../../entities/User'

@Resolver(User)
export default class UserFieldsResolver {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Name)
    private readonly nameRepository: Repository<Name>
  ) {}

  @FieldResolver((type) => Name, {nullable: true})
  async currentName(@Root() user: User): Promise<Name> {
    let response: Name = await this.nameRepository.findOneOrFail({
      where: {
        user,
        revoked: false,
      },
    })
    return response
  }

  @FieldResolver(() => [Name])
  async pastNames(@Root() user: User): Promise<Name[] | null> {
    let responseArr: Name[] = await this.nameRepository.find({
      where: {
        user,
        revoked: true,
      },
      order: {
        revokedAt: 'DESC',
      },
    })
    return responseArr
  }
}
