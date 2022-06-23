import {IsEmail, IsString, MinLength} from 'class-validator'
import {Field, InputType} from 'type-graphql'

@InputType('SignupInput')
export default class SignupInputType {
  @IsEmail()
  @Field({nullable: false})
  email: string

  @MinLength(1)
  @IsString()
  @Field({nullable: false})
  password: string

  @MinLength(1)
  @IsString()
  @Field({nullable: false})
  name: string

  public constructor(init?: Partial<SignupInputType>) {
    Object.assign(this, init)
  }
}
