import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { ApiConfigSettingsService } from './api-config-settings.service'
import { ApiConfigService } from './api-config.service'

describe('ApiConfigDataAccessService', () => {
  let service: ApiConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiConfigService, ApiConfigSettingsService],
      imports: [ConfigModule.forRoot()],
    }).compile()

    service = module.get(ApiConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
