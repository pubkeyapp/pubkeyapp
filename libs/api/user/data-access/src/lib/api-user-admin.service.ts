import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { Injectable, NotFoundException } from '@nestjs/common'
import { IdentityProvider, UserRole, UserStatus } from '@prisma/client'
import { AdminCreateUserInput } from './dto/admin-create-user.input'
import { AdminUpdateUserInput } from './dto/admin-update-user.input'

@Injectable()
export class ApiUserAdminService {
  async adminUser(adminId: string, userId) {
    await this.core.ensureAdminUser(adminId)
    const found = await this.core.data.findUserById(userId)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async adminUsers(adminId: string) {
    await this.core.ensureAdminUser(adminId)
    return this.core.data.user.findMany({ include: { identities: true }, orderBy: { updatedAt: 'desc' } })
  }

  constructor(private readonly core: ApiCoreService) {}

  async adminCreateUser(adminId: string, input: AdminCreateUserInput) {
    await this.core.ensureAdminUser(adminId)
    const found = await this.core.data.findUserByIdentity({
      provider: IdentityProvider.Solana,
      providerId: input.publicKey,
    })
    if (found) {
      throw new Error(`User with public key ${input.publicKey} already exists`)
    }
    return this.core.data.createUser(input.role ?? UserRole.User, UserStatus.Created, input.publicKey)
  }

  async adminUpdateUser(adminId: string, userId: string, input: AdminUpdateUserInput) {
    await this.core.ensureAdminUser(adminId)
    const found = await this.core.data.findUserById(userId)
    if (!found) {
      throw new NotFoundException()
    }
    return this.core.data.user.update({
      data: input,
      where: { id: userId },
    })
  }

  async adminDeleteUser(adminId: string, userId: string) {
    await this.core.ensureAdminUser(adminId)
    // Delete user data
    await this.core.data.identity.deleteMany({ where: { ownerId: userId } })
    await this.core.data.invite.deleteMany({ where: { ownerId: userId } })
    // Delete user
    return this.core.data.user.delete({ where: { id: userId } })
  }
}
