import { Test } from '@nestjs/testing'
import { ApiConfigService } from './api-config.service'

describe('ApiConfigDataAccessService', () => {
  let service: ApiConfigService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiConfigService],
    }).compile()

    service = module.get(ApiConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
