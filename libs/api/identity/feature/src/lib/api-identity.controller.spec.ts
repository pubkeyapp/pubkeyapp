import { Test } from '@nestjs/testing'
import { ApiIdentityController } from './api-identity.controller'

describe('ApiIdentityFeatureController', () => {
  let controller: ApiIdentityController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiIdentityController],
    }).compile()

    controller = module.get(ApiIdentityController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
