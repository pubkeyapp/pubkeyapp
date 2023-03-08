import { Test } from '@nestjs/testing'
import { ApiSolanaService } from './api-solana.service'

describe('ApiSolanaDataAccessService', () => {
  let service: ApiSolanaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiSolanaService],
    }).compile()

    service = module.get(ApiSolanaService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
