import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @ApiProperty()
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  createdAt: string

  @Field({ nullable: true })
  updatedAt: string

  @ApiProperty()
  @Field(() => IdentityProvider, { nullable: true })
  provider: IdentityProvider

  @ApiProperty()
  @Field()
  providerId: string

  @ApiProperty()
  @Field()
  verified: boolean
  @HideField()
  ownerId: string
}
