import { Injectable, OnModuleInit } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminListProfileInput } from './dto/admin-list-profile.input'
import { AdminUpdateProfileInput } from './dto/admin-update-profile.input'

@Injectable()
export class ApiAdminProfileService implements OnModuleInit {
  constructor(private readonly core: ApiCoreService) {}

  async adminDeleteProfile(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.delete({ where: { id } })
  }

  async adminProfiles(adminId: string, input: AdminListProfileInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: true, page: true },
    })
  }

  async adminProfile(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.findUnique({ where: { id }, include: { owner: true, page: true, user: true } })
  }

  async adminUpdateProfile(adminId: string, id: string, input: AdminUpdateProfileInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.update({
      where: { id },
      data: { ...input },
    })
  }

  async onModuleInit() {
    setTimeout(async () => {
      // await this.core.data.profile.deleteMany({})
      const pagesWithProfile = await this.core.data.page.findMany({
        where: { profile: { is: null } },
        include: { owner: true },
      })
      console.log('pagesWithProfile', pagesWithProfile.length)
      for (const page of pagesWithProfile) {
        console.log('page', page.id, page.type, page.ownerId)
        const created = await this.core.data.profile.create({
          data: {
            ownerId: page.ownerId,
            pageId: page.id,
            type: page.type,
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
            color: page.color,
            bio: page.owner.bio,
            name: page.owner.name,
            username: page.owner.username,
            avatar: page.owner.avatarUrl,
          },
        })
        const owner = await this.core.getUserById(page.ownerId)
        if (!owner.profile) {
          console.log('Setting profileId', created.id)
          await this.core.data.user.update({
            where: { id: page.ownerId },
            data: { profileId: created.id },
          })
        }
      }
    }, 1000)
  }
}
