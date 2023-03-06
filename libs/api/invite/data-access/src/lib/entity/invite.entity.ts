import { User } from '@pubkeyapp/api/user/data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Invite {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  expiresAt: Date

  @Field({ nullable: true })
  code: string

  @Field(() => Int, { nullable: true })
  maxUses: number

  @Field(() => Int, { nullable: true })
  useCount: number

  @Field(() => User, { nullable: true })
  owner: User

  @Field(() => [User], { nullable: true })
  users: User[]
}
