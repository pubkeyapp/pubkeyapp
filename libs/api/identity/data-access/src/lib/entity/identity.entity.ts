import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { GraphQLDateTime, GraphQLJSON } from 'graphql-scalars'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @ApiProperty()
  @Field(() => IdentityProvider, { nullable: true })
  provider: IdentityProvider

  @ApiProperty()
  @Field()
  providerId: string

  @ApiProperty({ nullable: true, required: false })
  @Field(() => GraphQLJSON, { nullable: true })
  profile?: unknown

  @HideField()
  accounts?: unknown[]

  @ApiProperty()
  @Field()
  verified: boolean
  @HideField()
  ownerId: string
}
