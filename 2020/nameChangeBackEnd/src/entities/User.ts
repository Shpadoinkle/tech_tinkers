import {Field, ID, ObjectType} from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Lazy} from '../utils/helpers'
import Name from './Name'
// import RefreshToken from './RefreshToken'

@ObjectType()
@Entity()
export default class User {
  @Field((type) => ID)
  get _id(): string {
    return this.id
  }

  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column()
  email: string

  // @Field({ nullable: true })
  @Column({nullable: true})
  passwordHash: string

  /**
   * A user has "names"
   */
  @OneToMany((type) => Name, (name) => name.user, {
    lazy: true,
  })
  names: Lazy<Name[]>

  // /**
  //  * A user has "refreshTokens"
  //  */
  // @OneToMany((type) => RefreshToken, (refreshToken) => refreshToken.user, {
  //   lazy: true,
  // })
  // refreshTokens: Lazy<RefreshToken[]>

  @Field()
  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date

  @Field()
  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date

  public constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }
}
