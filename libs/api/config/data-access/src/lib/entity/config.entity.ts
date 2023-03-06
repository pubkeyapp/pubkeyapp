import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '@pubkeyapp/api/user/data-access'
import { Cluster } from './cluster.entity'
import { ConfigApi } from './config-api.entity'
import { ConfigApp } from './config-app.entity'

@ObjectType()
export class Config {
  @ApiProperty({ type: ConfigApi, nullable: true })
  @Field(() => ConfigApi)
  api: ConfigApi
  @ApiProperty({ type: ConfigApp, nullable: true })
  @Field(() => ConfigApp)
  app: ConfigApp
  @ApiProperty({ type: Cluster, nullable: true })
  @Field(() => Cluster)
  cluster: Cluster
  @ApiProperty({ type: [Cluster], nullable: true })
  @Field(() => [Cluster])
  clusters: Cluster[]
  @ApiProperty({ type: User, nullable: true })
  user: User
}
