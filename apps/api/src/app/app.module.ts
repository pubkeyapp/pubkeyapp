import { Module } from '@nestjs/common'
import { ApiCoreFeatureModule } from '@pubkeyapp/api/core/feature'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
