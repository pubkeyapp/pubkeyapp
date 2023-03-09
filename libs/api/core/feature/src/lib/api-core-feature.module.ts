import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { GraphQLModule } from '@nestjs/graphql'
import { ServeStaticModule } from '@nestjs/serve-static'
import { OgmaModule } from '@ogma/nestjs-module'
import { ApiAccountFeatureModule } from '@pubkeyapp/api/account/feature'
import { ApiAuthFeatureModule } from '@pubkeyapp/api/auth/feature'
import { ApiConfigDataAccessModule, ApiConfigService } from '@pubkeyapp/api/config/data-access'
import { ApiConfigFeatureModule } from '@pubkeyapp/api/config/feature'
import { ApiCoreDataAccessModule } from '@pubkeyapp/api/core/data-access'
import { ApiDiscordFeatureModule } from '@pubkeyapp/api/discord/feature'
import { ApiDomainFeatureModule } from '@pubkeyapp/api/domain/feature'
import { ApiIdentityFeatureModule } from '@pubkeyapp/api/identity/feature'
import { ApiInviteFeatureModule } from '@pubkeyapp/api/invite/feature'
import { ApiPageFeatureModule } from '@pubkeyapp/api/page/feature'
import { ApiPlanFeatureModule } from '@pubkeyapp/api/plan/feature'
import { ApiQueueFeatureModule } from '@pubkeyapp/api/queue/feature'
import { ApiSolanaFeatureModule } from '@pubkeyapp/api/solana/feature'
import { ApiUserFeatureModule } from '@pubkeyapp/api/user/feature'
import { join } from 'path'
import { ApiAdminCoreResolver } from './api-admin-core.resolver'

import { ApiCoreFeatureOgmaConfig } from './api-core-feature-ogma-config'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'
import { serveStaticFactory } from './serve-static.factory'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver, ApiAdminCoreResolver],
  exports: [],
  imports: [
    ApiAccountFeatureModule,
    ApiAuthFeatureModule,
    ApiConfigFeatureModule,
    ApiCoreDataAccessModule,
    ApiDiscordFeatureModule,
    ApiDomainFeatureModule,
    ApiIdentityFeatureModule,
    ApiInviteFeatureModule,
    ApiPageFeatureModule,
    ApiPlanFeatureModule,
    ApiQueueFeatureModule,
    ApiSolanaFeatureModule,
    ApiUserFeatureModule,
    EventEmitterModule.forRoot({ global: true, delimiter: ':' }),
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
      inject: [ApiConfigService],
    }),
    ServeStaticModule.forRootAsync({ useFactory: serveStaticFactory() }),
  ],
})
export class ApiCoreFeatureModule {}
