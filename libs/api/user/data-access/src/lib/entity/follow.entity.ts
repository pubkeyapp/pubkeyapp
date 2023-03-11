import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.entity'

@ObjectType()
export class Follow {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: Date

  @Field({ nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  followerId: string

  @Field(() => User, { nullable: true })
  follower: User

  @Field({ nullable: true })
  ownerId: string

  @Field(() => User, { nullable: true })
  owner: User
}
