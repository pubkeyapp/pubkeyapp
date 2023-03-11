import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLDateTime } from 'graphql-scalars'
import { User } from './user.entity'

@ObjectType()
export class Follow {
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
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
