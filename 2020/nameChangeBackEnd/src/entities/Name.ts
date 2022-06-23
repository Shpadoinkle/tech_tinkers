import {Field, ID, ObjectType} from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {Lazy} from '../utils/helpers'
import User from './User'

@Entity()
@ObjectType()
export default class Name {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Field()
  @Column({nullable: false})
  string: string

  @ManyToOne((type) => User, (user) => user.names, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  user: Lazy<User>

  @Index()
  @Column({nullable: false, default: false})
  revoked: boolean

  @Field()
  @Column({nullable: true})
  revokedAt: Date

  @CreateDateColumn({nullable: false})
  createdAt: Date

  @Field()
  @Column({nullable: false})
  expiresAt: Date

  public constructor(init?: Partial<Name>) {
    Object.assign(this, init)
  }
}
