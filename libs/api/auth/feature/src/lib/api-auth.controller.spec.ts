import { Test } from '@nestjs/testing'
import { ApiAuthController } from './api-auth.controller'

describe('ApiAuthController', () => {
  let controller: ApiAuthController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiAuthController],
    }).compile()

    controller = module.get(ApiAuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
