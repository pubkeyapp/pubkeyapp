import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminGetProfilesInput } from './dto/admin-get-profiles.input'
import { AdminUpdateProfileInput } from './dto/admin-update-profile.input'

@Injectable()
export class ApiAdminProfileService implements OnModuleInit {
  private readonly logger = new Logger(ApiAdminProfileService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminDeleteProfile(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.delete({ where: { id } })
  }

  async adminGetProfiles(adminId: string, input: AdminGetProfilesInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.findMany({
      where: { ownerId: input.ownerId ? input.ownerId : undefined },
      include: { owner: true, page: true },
    })
  }

  async adminGetProfile(adminId: string, id: string) {
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
      for (const page of pagesWithProfile) {
        this.logger.log('Creating profile for Page => ', page.id, page.type, page.ownerId)
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
          this.logger.log('Setting default profile for user -> ', created.id)
          await this.core.data.user.update({
            where: { id: page.ownerId },
            data: { profileId: created.id },
          })
        }
      }
    }, 1000)
  }
}
