import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.enum'

@InputType()
export class AdminCreateUserInput {
  @Field({ nullable: true })
  publicKey: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole
}
