import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { OgmaModule } from '@ogma/nestjs-module'
import { ApiAuthFeatureModule } from '@pubkeyapp/api/auth/feature'
import { ApiConfigDataAccessModule, ApiConfigDataAccessService } from '@pubkeyapp/api/config/data-access'
import { ApiConfigFeatureModule } from '@pubkeyapp/api/config/feature'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiDiscordFeatureModule } from '@pubkeyapp/api/discord/feature'
import { ApiDomainFeatureModule } from '@pubkeyapp/api/domain/feature'
import { ApiIdentityFeatureModule } from '@pubkeyapp/api/identity/feature'
import { ApiInviteFeatureModule } from '@pubkeyapp/api/invite/feature'
import { ApiPageFeatureModule } from '@pubkeyapp/api/page/feature'
import { ApiQueueFeatureModule } from '@pubkeyapp/api/queue/feature'
import { ApiSolanaFeatureModule } from '@pubkeyapp/api/solana/feature'
import { ApiUserFeatureModule } from '@pubkeyapp/api/user/feature'
import { join } from 'path'

import { ApiCoreFeatureOgmaConfig } from './api-core-feature-ogma-config'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { serveStaticFactory } from './serve-static.factory'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver],
  exports: [],
  imports: [
    ApiAuthFeatureModule,
    ApiConfigFeatureModule,
    ApiCoreDataAccessModule,
    ApiDiscordFeatureModule,
    ApiDomainFeatureModule,
    ApiIdentityFeatureModule,
    ApiInviteFeatureModule,
    ApiPageFeatureModule,
    ApiQueueFeatureModule,
    ApiSolanaFeatureModule,
    ApiUserFeatureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
    }),
    OgmaModule.forRootAsync({
      useClass: ApiCoreFeatureOgmaConfig,
      imports: [ApiConfigDataAccessModule],
      inject: [ApiConfigDataAccessService],
    }),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
})
export class ApiCoreFeatureModule {}
