import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.enum'

@InputType()
export class AdminUpdateUserInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  avatarUrl?: string

  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  bio?: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole
}
