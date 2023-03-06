import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminAddPageDomainInput {
  @Field()
  domainId: string
  @Field()
  path: string
}
