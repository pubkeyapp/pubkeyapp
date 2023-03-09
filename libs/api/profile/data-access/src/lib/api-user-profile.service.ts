import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { getProfileTypeColor } from './api-profile-helper'

import { UserUpdateProfileInput } from './dto/user-update-profile.input'
import { ProfileType } from './entity/profile-type.enum'
@Injectable()
export class ApiUserProfileService {
  private readonly logger = new Logger(ApiUserProfileService.name)
  constructor(private readonly core: ApiCoreService) {}

  async userProfile(userId: string, profileId: string) {
    return this.ensureProfileOwner(userId, profileId)
  }

  async userProfilePage(userId: string, profileId: string) {
    const profile = await this.ensureProfileOwner(userId, profileId)

    return profile.page
  }

  async userProfiles(userId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.profile.findMany({
      where: { ownerId: userId },
      include: { user: true, page: { include: { domains: { include: { domain: true } } } } },
    })
  }

  async userCreateProfile(userId: string, type: ProfileType) {
    const user = await this.core.ensureUserActive(userId)

    return this.core.data.profile.create({
      data: {
        type,
        ownerId: userId,
        color: getProfileTypeColor(type),
        bio: user.profile?.bio,
        name: user.profile?.name,
        username: user.profile?.username,
        avatar: user.profile?.avatar,
      },
    })
  }

  async userDeleteProfile(userId: string, profileId: string) {
    await this.ensureProfileOwner(userId, profileId)
    return this.core.data.profile.delete({ where: { id: profileId } })
  }

  async userUpdateProfile(userId: string, profileId: string, input: UserUpdateProfileInput) {
    await this.ensureProfileOwner(userId, profileId)
    return this.core.data.profile.update({
      where: { id: profileId },
      data: { ...input },
    })
  }

  async ensureProfileOwner(userId: string, profileId: string) {
    await this.core.ensureUserActive(userId)
    const profile = await this.core.data.profile.findUnique({
      where: { id: profileId },
      include: {
        owner: true,
        page: {
          include: {
            blocks: true,
            domains: { include: { domain: true } },
          },
        },
        user: true,
      },
    })
    if (!profile) {
      throw new Error('Profile could not be found')
    }
    if (profile.ownerId !== userId) {
      throw new Error('Profile does not belong to user')
    }
    return profile
  }
}
