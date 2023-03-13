import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserAddPageDomainInput {
  @Field()
  domainId: string
  @Field()
  path: string
}
