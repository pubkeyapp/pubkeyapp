import { Test } from '@nestjs/testing'
import { ApiInviteAdminService } from './api-invite-admin.service'

describe('ApiInviteDataAccessService', () => {
  let service: ApiInviteAdminService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiInviteAdminService],
    }).compile()

    service = module.get(ApiInviteAdminService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
