import { Test } from '@nestjs/testing'
import { ApiAnonAccountService } from './api-anon-account.service'

describe('ApiAccountDataAccessService', () => {
  let service: ApiAnonAccountService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiAnonAccountService],
    }).compile()

    service = module.get(ApiAnonAccountService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
