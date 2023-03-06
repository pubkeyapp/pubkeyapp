import { Injectable, NotFoundException } from '@nestjs/common'
import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { IdentityProvider } from '@pubkeyapp/api/identity/data-access'

@Injectable()
export class ApiUserPublicService {
  constructor(private readonly core: ApiCoreService) {}

  async publicUser(username) {
    const found = await this.core.data.findUserByUsername(username)
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  publicUserFollowers(username) {
    return this.core.data.user.findMany({
      where: {
        followers: { some: { owner: { username } } },
      },
    })
  }

  publicUserFollowing(username) {
    return this.core.data.user.findMany({
      where: {
        following: { some: { follower: { username } } },
      },
    })
  }

  publicUserInvites(username: string) {
    return this.core.data.invite
      .findMany({
        where: { owner: { username } },
        include: { users: true },
      })
      .then((res) => {
        return res.map((item) => {
          return {
            ...item,
            code: undefined,
          }
        })
      })
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
