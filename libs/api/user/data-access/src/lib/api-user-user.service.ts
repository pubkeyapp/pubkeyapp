import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService, getProfileUsername } from '@pubkeyapp/api/core/data-access'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserRelation } from './entity/user.relation'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly account: ApiAnonAccountService, private readonly core: ApiCoreService) {}

  async userFollowUser(ownerId: string, username: string): Promise<User> {
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

  async userUnfollowUser(ownerId: string, username: string): Promise<User> {
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

  async userUpdateUser(userId: string, input: UserUpdateUserInput) {
    if (input.username && input.username.length > 15) {
      throw new Error('Username must be less than 15 characters')
    }
    await this.core.data.user.update({
      where: { id: userId },
      data: { ...input, username: input.username ? getProfileUsername(input.username) : undefined },
    })
    return this.core.getUserById(userId, true)
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
    const user = await this.core.getUserByUsername(username)

    if (!user) {
      throw new NotFoundException(`User ${username} not found`)
    }
    return user
  }

  async userVerifyUser(userId: string) {
    const owner = await this.core.ensureUserActive(userId)
    if (!owner.identity) {
      throw new Error('User does not have an identity')
    }
    if (!owner.publicKey) {
      throw new Error('User does not have a public key')
    }
    return this.core.getUserById(userId, true)
  }
}
