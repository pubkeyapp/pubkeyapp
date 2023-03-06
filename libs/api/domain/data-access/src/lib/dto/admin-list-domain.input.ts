import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminListDomainInput {
  @Field({ nullable: true })
  ownerId?: string
}
