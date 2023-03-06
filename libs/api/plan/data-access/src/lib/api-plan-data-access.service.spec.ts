import { Test } from '@nestjs/testing'
import { ApiPlanAdminService } from './api-plan-admin.service'

describe('ApiPlanDataAccessService', () => {
  let service: ApiPlanAdminService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiPlanAdminService],
    }).compile()

    service = module.get(ApiPlanAdminService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
