import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminCreateInviteInput } from './dto/admin-create-invite.input'
import { AdminListInviteInput } from './dto/admin-list-invite.input'
import { AdminUpdateInviteInput } from './dto/admin-update-invite.input'

function generateInviteCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

@Injectable()
export class ApiInviteAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateInvite(adminId: string, input: AdminCreateInviteInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.invite.create({
      data: {
        code: generateInviteCode(),
        ownerId: input.ownerId ?? adminId,
        ...input,
      },
      include: { owner: true },
    })
  }

  async adminDeleteInvite(adminId: string, id: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.invite.delete({ where: { id } })
  }

  async adminInvites(adminId: string, input: AdminListInviteInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.invite.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: true },
    })
  }

  async adminInvite(adminId: string, id: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.invite.findUnique({ where: { id }, include: { owner: true, users: true } })
  }

  async adminUpdateInvite(adminId: string, id: string, input: AdminUpdateInviteInput) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.invite.update({
      where: { id },
      data: { ...input },
    })
  }
}
