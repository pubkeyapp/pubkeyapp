import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'
import { User } from '@pubkeyapp/api/user/data-access'
import { GraphQLDateTime } from 'graphql-scalars'

@ObjectType()
export class Domain {
  @Field({ nullable: true })
  id: string

  @Field(() => GraphQLDateTime, { nullable: true })
  createdAt: Date

  @Field(() => GraphQLDateTime, { nullable: true })
  updatedAt: Date

  @Field({ nullable: true })
  name: string
  @Field(() => Int, { nullable: true })
  order: number

  @Field({ nullable: true })
  private: boolean

  @Field({ nullable: true })
  premium: boolean

  @Field({ nullable: true })
  secure: boolean
  @Field(() => User, { nullable: true })
  owner: User

  @HideField()
  pages: unknown[]
  static url(domain: Domain, path?: string): string {
    return [domain.secure ? 'https' : 'http', '://', domain?.name, '/', path].join('')
  }
}
