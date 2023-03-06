import { Test } from '@nestjs/testing'
import { ApiSolanaFeatureController } from './api-solana-feature.controller'

describe('ApiSolanaFeatureController', () => {
  let controller: ApiSolanaFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiSolanaFeatureController],
    }).compile()

    controller = module.get(ApiSolanaFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
