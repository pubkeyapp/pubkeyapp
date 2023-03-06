import { Test } from '@nestjs/testing'
import { ApiDiscordDataAccessService } from './api-discord-data-access.service'

describe('ApiDiscordDataAccessService', () => {
  let service: ApiDiscordDataAccessService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDiscordDataAccessService],
    }).compile()

    service = module.get(ApiDiscordDataAccessService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
