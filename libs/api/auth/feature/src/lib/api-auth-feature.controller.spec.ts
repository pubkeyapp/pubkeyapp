import { Test } from '@nestjs/testing'
import { ApiAuthFeatureController } from './api-auth-feature.controller'

describe('ApiAuthFeatureController', () => {
  let controller: ApiAuthFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAuthFeatureController],
    }).compile()

    controller = module.get(ApiAuthFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
