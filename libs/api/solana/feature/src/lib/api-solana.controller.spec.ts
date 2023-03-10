import { Test } from '@nestjs/testing'
import { ApiSolanaController } from './api-solana.controller'

describe('ApiSolanaFeatureController', () => {
  let controller: ApiSolanaController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiSolanaController],
    }).compile()

    controller = module.get(ApiSolanaController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
