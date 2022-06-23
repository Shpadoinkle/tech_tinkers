import {Query, Resolver} from 'type-graphql'
import {LessThanOrEqual, Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'
import Name from '../../../entities/Name'
import moment = require('moment')

@Resolver(/* istanbul ignore next */ (of) => Name)
export default class NameQueriesResolver {
  constructor(
    @InjectRepository(Name) private readonly nameRepository: Repository<Name>
  ) {}

  @Query(/* istanbul ignore next */ (returns) => [Name], {nullable: true})
  async upcomingNames(): Promise<Name[]> {
    let checkTime = moment().endOf('day').add(28, 'days').toISOString()

    let responseArr: Name[] = await this.nameRepository.find({
      where: {
        revoked: false,
        expiresAt: LessThanOrEqual(checkTime),
      },
      order: {
        expiresAt: 'ASC',
      },
    })

    return responseArr
  }
}
