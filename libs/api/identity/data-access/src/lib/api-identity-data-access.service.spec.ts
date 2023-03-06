import { Test } from '@nestjs/testing'
import { ApiIdentityDataAccessService } from './api-identity-data-access.service'

describe('ApiIdentityDataAccessService', () => {
  let service: ApiIdentityDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiIdentityDataAccessService],
    }).compile()

    service = module.get(ApiIdentityDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
