import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminGetDomainsInput {
  @Field({ nullable: true })
  ownerId?: string
}
