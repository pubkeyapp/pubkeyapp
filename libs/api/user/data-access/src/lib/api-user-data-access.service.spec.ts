import { Test } from '@nestjs/testing'
import { ApiUserAdminService } from './api-user-admin.service'

describe('ApiUserDataAccessService', () => {
  let service: ApiUserAdminService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUserAdminService],
    }).compile()

    service = module.get(ApiUserAdminService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
