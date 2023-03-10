import { Test } from '@nestjs/testing'
import { ApiConfigController } from './api-config.controller'

describe('ApiConfigController', () => {
  let controller: ApiConfigController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiConfigController],
    }).compile()

    controller = module.get(ApiConfigController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
