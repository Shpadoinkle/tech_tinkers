import {Field, InputType} from 'type-graphql'
// import {IsEmail} from 'class-validator'

@InputType('LoginInput')
export default class LoginInputType {
  // @IsEmail()
  @Field({nullable: false})
  email: string

  @Field({nullable: false})
  password: string

  public constructor(init?: Partial<LoginInputType>) {
    Object.assign(this, init)
  }
}
