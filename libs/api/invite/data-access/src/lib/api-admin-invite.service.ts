import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { generateInviteCode } from './api-invite-helpers'
import { AdminCreateInviteInput } from './dto/admin-create-invite.input'
import { AdminGetInvitesInput } from './dto/admin-get-invites.input'
import { AdminUpdateInviteInput } from './dto/admin-update-invite.input'

@Injectable()
export class ApiAdminInviteService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateInvite(adminId: string, input: AdminCreateInviteInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.create({
      data: {
        code: generateInviteCode(),
        ownerId: input.ownerId?.length ? input.ownerId : adminId,
        expiresAt: input.expiresAt?.length ? new Date(input.expiresAt) : undefined,
        maxUses: input.maxUses ?? 0,
      },
      include: { owner: true },
    })
  }

  async adminDeleteInvite(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.delete({ where: { id } })
  }

  async adminGetInvites(adminId: string, input: AdminGetInvitesInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: { include: { profile: true } } },
    })
  }

  async adminGetInvite(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.findUnique({ where: { id }, include: { owner: true, users: true } })
  }

  async adminUpdateInvite(adminId: string, id: string, input: AdminUpdateInviteInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.update({
      where: { id },
      data: { ...input },
    })
  }
}
