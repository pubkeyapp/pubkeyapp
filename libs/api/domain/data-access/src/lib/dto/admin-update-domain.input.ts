import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminUpdateDomainInput {
  @Field({ nullable: true })
  private?: boolean

  @Field({ nullable: true })
  premium?: boolean

  @Field({ nullable: true })
  secure?: boolean
  @Field(() => Int, { nullable: true })
  order?: number
}
