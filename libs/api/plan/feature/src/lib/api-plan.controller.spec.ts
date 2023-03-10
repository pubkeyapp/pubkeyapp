import { Test } from '@nestjs/testing'
import { ApiPlanController } from './api-plan.controller'

describe('ApiPlanController', () => {
  let controller: ApiPlanController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiPlanController],
    }).compile()

    controller = module.get(ApiPlanController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
