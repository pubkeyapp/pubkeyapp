import { Test } from '@nestjs/testing'
import { ApiPublicIdentityService } from './api-public-identity.service'

describe('ApiIdentityDataAccessService', () => {
  let service: ApiPublicIdentityService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPublicIdentityService],
    }).compile()

    service = module.get(ApiPublicIdentityService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
