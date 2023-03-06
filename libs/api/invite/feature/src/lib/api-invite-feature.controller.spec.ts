import { Test } from '@nestjs/testing'
import { ApiInviteFeatureController } from './api-invite-feature.controller'

describe('ApiInviteFeatureController', () => {
  let controller: ApiInviteFeatureController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiInviteFeatureController],
    }).compile()

    controller = module.get(ApiInviteFeatureController)
  })

  it('should be defined', () => {
    expect(controller).toBeTruthy()
  })
})
