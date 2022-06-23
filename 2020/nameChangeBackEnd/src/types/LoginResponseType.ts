import {ObjectType, Field} from 'type-graphql'

@ObjectType('LoginResponse')
export default class LoginResponseType {
  @Field({nullable: false})
  accessToken: string

  // @Field({ nullable: false })
  // refreshToken: string

  public constructor(init?: Partial<LoginResponseType>) {
    Object.assign(this, init)
  }
}
