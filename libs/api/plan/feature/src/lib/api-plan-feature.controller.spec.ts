import { Test } from '@nestjs/testing'
import { ApiPlanFeatureController } from './api-plan-feature.controller'

describe('ApiPlanFeatureController', () => {
  let controller: ApiPlanFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiPlanFeatureController],
    }).compile()

    controller = module.get(ApiPlanFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
