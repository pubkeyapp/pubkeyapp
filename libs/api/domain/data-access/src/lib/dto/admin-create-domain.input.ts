import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateDomainInput {
  @Field()
  name: string

  @Field({ nullable: true })
  ownerId?: string
  @Field({ nullable: true })
  private?: boolean

  @Field({ nullable: true })
  premium?: boolean
  @Field({ nullable: true })
  secure?: boolean
}
