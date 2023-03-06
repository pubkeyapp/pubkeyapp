import { Test } from '@nestjs/testing'
import { ApiSolanaDataAccessService } from './api-solana-data-access.service'

describe('ApiSolanaDataAccessService', () => {
  let service: ApiSolanaDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiSolanaDataAccessService],
    }).compile()

    service = module.get(ApiSolanaDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
