import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminGetProfilesInput {
  @Field({ nullable: true })
  ownerId?: string
}
