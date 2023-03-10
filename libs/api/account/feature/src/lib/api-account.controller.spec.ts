import { Test } from '@nestjs/testing'
import { ApiAccountController } from './api-account.controller'

describe('ApiAccountFeatureController', () => {
  let controller: ApiAccountController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAccountController],
    }).compile()

    controller = module.get(ApiAccountController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
