import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { AdminGetProfilesInput } from './dto/admin-get-profiles.input'
import { AdminUpdateProfileInput } from './dto/admin-update-profile.input'

@Injectable()
export class ApiAdminProfileService {
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
      include: {
        owner: true,
        page: true,
        gumProfile: true,
        gumProfileMeta: true,
      },
    })
  }

  async adminGetProfile(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.findUnique({
      where: { id },
      include: {
        owner: { include: { profile: true, gumUser: true } },
        page: true,
        user: true,
        gumProfile: true,
        gumProfileMeta: true,
      },
    })
  }

  async adminUpdateProfile(adminId: string, id: string, input: AdminUpdateProfileInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.profile.update({
      where: { id },
      data: { ...input },
    })
  }
}
