import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserRelation {
  @Field()
  isYou: boolean

  @Field()
  isFollowingYou: boolean

  @Field()
  isFollowedByYou: boolean
}
