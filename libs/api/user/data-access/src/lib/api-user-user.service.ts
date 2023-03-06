import { ApiCoreService } from '@pubkeyapp/api/core/data-access'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserRelation } from './entity/user.relation'

@Injectable()
export class ApiUserUserService {
  constructor(private readonly core: ApiCoreService) {}

  async user(username) {
    const user = await this.core.data.findUserByUsername(username)
    if (!user) {
      throw new NotFoundException()
    }
    return user
  }

  userFollowers(username) {
    return this.core.data.user.findMany({
      where: {
        following: { some: { follower: { username } } },
      },
    })
  }

  userFollowing(username) {
    return this.core.data.user.findMany({
      where: {
        followers: { some: { owner: { username } } },
      },
    })
  }

  userInvites(username: string) {
    return this.core.data.invite
      .findMany({
        where: { owner: { username } },
        include: { users: true },
      })
      .then((res) => res.map((item) => ({ ...item, code: undefined })))
  }

  async userFollow(ownerId: string, username: string): Promise<User> {
    const user = await this.ensureValidUser(username)

    if (user.id === ownerId) {
      throw new BadRequestException(`You can not follow yourself`)
    }

    const following = await this.getOwnerFollower(ownerId, username)

    if (following) {
      throw new BadRequestException(`You already follow this user`)
    }

    await this.core.data.follow.create({ data: { ownerId: ownerId, followerId: user.id } })

    await Promise.all([this.incrementFollowingCount(ownerId), this.incrementFollowersCount(user.id)])

    return user
  }

  async userUnfollow(ownerId: string, username: string): Promise<User> {
    const user = await this.ensureValidUser(username)

    if (user.id === ownerId) {
      throw new BadRequestException(`You can not unfollow yourself`)
    }

    const following = await this.getOwnerFollower(ownerId, username)

    if (!following) {
      throw new BadRequestException(`Not following this user`)
    }

    await this.core.data.follow.delete({
      where: { ownerId_followerId: { ownerId: ownerId, followerId: user.id } },
    })

    await Promise.all([this.decrementFollowingCount(ownerId), this.decrementFollowersCount(user.id)])

    return user
  }

  async userRelation(ownerId: string, username: string): Promise<UserRelation> {
    const member = await this.core.data.user.findUnique({
      where: { username },
      include: {
        followers: { where: { ownerId: ownerId } },
        following: { where: { followerId: ownerId } },
      },
    })
    const isYou = ownerId === member.id

    return {
      isYou,
      isFollowedByYou: !!member.followers.length,
      isFollowingYou: !!member.following.length,
    }
  }

  private decrementFollowersCount(ownerId: string) {
    return this.core.data.user.update({ where: { id: ownerId }, data: { followersCount: { decrement: 1 } } })
  }

  private decrementFollowingCount(ownerId: string) {
    return this.core.data.user.update({ where: { id: ownerId }, data: { followingCount: { decrement: 1 } } })
  }

  private incrementFollowersCount(ownerId: string) {
    return this.core.data.user.update({ where: { id: ownerId }, data: { followersCount: { increment: 1 } } })
  }

  private incrementFollowingCount(ownerId: string) {
    return this.core.data.user.update({ where: { id: ownerId }, data: { followingCount: { increment: 1 } } })
  }

  private async getOwnerFollower(ownerId: string, username: string) {
    return this.core.data.follow.findFirst({ where: { ownerId, follower: { username } } })
  }

  private async ensureValidUser(username: string) {
    const user = await this.core.data.findUserByUsername(username)

    if (!user) {
      throw new NotFoundException(`User ${username} not found`)
    }
    return user
  }
}
