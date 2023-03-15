import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { GumSdkProfileMetadata } from '@pubkeyapp/api/gum/data-access'
import { IdentityProvider } from '@pubkeyapp/api/identity/data-access'

@Injectable()
export class ApiPublicUserService {
  constructor(private readonly core: ApiCoreService) {}

  anonGetUser(username) {
    return this.core.ensureUsername(username)
  }

  async anonGetUserPages(username: string) {
    const user = await this.core.ensureUsername(username)
    return this.core.data.page.findMany({
      where: { owner: { id: user.id } },
      include: { owner: { include: { profile: true } }, domains: { include: { domain: true } }, blocks: true },
    })
  }

  async anonGetUserFollowers(username) {
    await this.core.ensureUsername(username)
    return this.core.data.user.findMany({
      where: {
        followers: { some: { owner: { username } } },
      },
    })
  }

  async anonGetUserFollowing(username) {
    await this.core.ensureUsername(username)
    return this.core.data.user.findMany({
      where: {
        following: { some: { follower: { username } } },
      },
    })
  }

  async anonGetUserInvites(username: string) {
    await this.core.ensureUsername(username)
    return this.core.data.invite
      .findMany({
        where: { owner: { username } },
        include: { users: true },
      })
      .then((res) => res.map((item) => ({ ...item, code: undefined })))
  }

  async anonGetUserProfiles(username: string) {
    const found = await this.core.ensureUsername(username)
    if (!found.publicKey) {
      throw new BadRequestException(`User ${username} has no public key`)
    }

    const users = await this.core.cache.wrap(
      'gum',
      `get-users-for-pk:${found.publicKey}`,
      () => this.core.gum.getUsersForPk(found.publicKey),
      60 * 10,
    )
    const userPks = users.map((item) => item.pubkey)
    if (userPks.length === 0) {
      return {
        users: users,
        usersLength: users.length,
        profiles: [],
        profilesLength: 0,
      }
    }

    const profiles = await this.core.cache.wrap(
      'gum',
      `get-profiles-for-pks:${userPks.sort().join('-')}`,
      () => this.core.gum.getProfilesForPks(userPks),
      60 * 10,
    )

    const profilePks = profiles.map((item) => item.pubkey)
    const profileMetas = await this.core.cache.wrap(
      'gum',
      `get-profile-metas-for-pks:${profilePks.sort().join('-')}`,
      () => this.core.gum.getProfileMetasForPks(profilePks),
      10,
    )

    const result: GumSdkProfileMetadata[] = profileMetas.map((item) => {
      const profile = profiles.find((profile) => profile.pubkey === item.profileId)
      const user = users.find((user) => user.pubkey === profile?.username)
      return {
        ...item,
        profile: {
          ...profile,
          user,
        },
      }
    })

    return {
      users,
      profiles: result,
    }
  }

  async getUserById(userId: string) {
    const found = await this.core.getUserById(userId)
    if (!found) {
      throw new NotFoundException('User not found')
    }
    return found
  }
  async getUserByIdentity(provider: IdentityProvider, providerId: string) {
    const found = await this.core.getUserByIdentity(provider, providerId)
    if (!found) {
      throw new NotFoundException('User not found')
    }
    return found
  }
  async getUserByUsername(username: string) {
    const found = await this.core.getUserByUsername(username)
    if (!found) {
      throw new NotFoundException('User not found')
    }
    return found
  }
}
