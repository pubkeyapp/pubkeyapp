import { Test } from '@nestjs/testing'
import { ApiDiscordService } from './api-discord.service'

describe('ApiDiscordService', () => {
  let service: ApiDiscordService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDiscordService],
    }).compile()

    service = module.get(ApiDiscordService)
  })

  it('should be defined', () => {
    expect(service).toBeTruthy()
  })
})
