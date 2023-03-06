import { Test } from '@nestjs/testing'
import { ApiIdentityFeatureController } from './api-identity-feature.controller'

describe('ApiIdentityFeatureController', () => {
  let controller: ApiIdentityFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiIdentityFeatureController],
    }).compile()

    controller = module.get(ApiIdentityFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
