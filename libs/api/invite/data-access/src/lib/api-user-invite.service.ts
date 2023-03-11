import { Injectable, Logger } from '@nestjs/common'
import { UserStatus } from '@prisma/client'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { validateInviteCode } from './api-invite-helpers'

@Injectable()
export class ApiUserInviteService {
  private readonly logger = new Logger(ApiUserInviteService.name)
  constructor(private readonly core: ApiCoreService) {}

  async userGetInvite(userId: string) {
    await this.core.ensureUser(userId)

    return this.core.data.user
      .findUnique({
        where: { id: userId },
        include: { invite: { include: { users: true, owner: { include: { profile: true } } } } },
      })
      .then((res) =>
        res.invite
          ? {
              ...res.invite,
              code: undefined,
            }
          : null,
      )
  }

  async userGetInvites(userId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.invite.findMany({
      where: { ownerId: userId },
      include: { owner: true, users: true },
    })
  }

  async userAcceptInvite(userId: string, code: string) {
    const valid = validateInviteCode(code)
    if (!valid) {
      throw new Error('Invalid invite code')
    }

    const user = await this.core.getUserById(userId)

    if (user.status === UserStatus.Inactive) {
      throw new Error('User is inactive')
    }
    if (user.status === UserStatus.Active) {
      const existing = await this.userGetInvite(userId)
      if (existing) {
        throw new Error('User already accepted an invite')
      }
    }

    const invite = await this.core.data.invite.findUnique({
      where: { code },
      include: { users: true },
    })
    if (!invite) {
      throw new Error('Invite not found')
    }
    if (invite.maxUses && (invite.useCount >= invite.maxUses || invite.users?.length >= invite.maxUses)) {
      throw new Error('Invite is already used')
    }
    if (invite.expiresAt && invite.expiresAt < new Date()) {
      throw new Error('Invite is expired')
    }
    await this.core.data.invite.update({
      where: { id: invite.id },
      data: {
        useCount: invite.useCount + 1,
        users: { connect: { id: userId } },
      },
    })
    await this.core.data.user.update({
      where: { id: userId },
      data: { status: UserStatus.Active },
    })
    this.logger.verbose(`User ${userId} accepted invite ${invite.id}`)
    return this.userGetInvite(userId)
  }
}
