// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   Index,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from 'typeorm'
// import {JsonWebTokenClaims} from '../models/JsonWebToken'
// import {Lazy} from '../utils/helpers'
// import User from './User'

// @Entity()
// export default class RefreshToken {
//   @PrimaryGeneratedColumn('uuid')
//   readonly id: string

//   @Index()
//   @Column({nullable: false})
//   token: string

//   @Column('simple-json', {nullable: true})
//   json: JsonWebTokenClaims

//   @ManyToOne((type) => User, (user) => user.refreshTokens, {
//     lazy: true,
//     onDelete: 'CASCADE',
//   })
//   user: Lazy<User>

//   @Index()
//   @Column({nullable: false, default: false})
//   revoked: boolean

//   @CreateDateColumn({nullable: false})
//   createdAt: Date

//   @Column({nullable: true})
//   revokedAt: Date

//   @Column({nullable: false})
//   expiresAt: Date
// }
