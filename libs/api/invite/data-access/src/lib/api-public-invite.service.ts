import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Invite } from './entity/invite.entity'

@Injectable()
export class ApiPublicInviteService {
  constructor(private readonly core: ApiCoreService) {}

  getInviteUrl(invite: Invite) {
    return `${this.core.config.webUrl}/invite/${invite.code}`
  }

  async anonGetInvite(code: string) {
    const found = await this.core.data.invite.findUnique({
      where: { code },
      include: { owner: { include: { profile: true } }, users: true },
    })
    if (!found) {
      throw new NotFoundException(`Invite ${code} not found`)
    }
    return found
  }

  isExpired(invite: Omit<Invite, 'owner' | 'users'>) {
    if (!invite.expiresAt) {
      return false
    }
    return invite.expiresAt < new Date()
  }

  isUsedUp(invite: Omit<Invite, 'owner' | 'users'>) {
    if (invite.maxUses === 0) {
      return false
    }
    return invite.useCount >= invite.maxUses
  }
}
