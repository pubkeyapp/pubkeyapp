import { Test } from '@nestjs/testing'
import { ApiAuthDataAccessService } from './api-auth-data-access.service'

describe('ApiAuthDataAccessService', () => {
  let service: ApiAuthDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiAuthDataAccessService],
    }).compile()

    service = module.get(ApiAuthDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
