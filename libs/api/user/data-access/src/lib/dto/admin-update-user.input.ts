import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.enum'
import { UserStatus } from '../entity/user-status.enum'

@InputType()
export class AdminUpdateUserInput {
  @Field({ nullable: true })
  username?: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole

  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
}
