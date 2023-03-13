import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { AccountType, NetworkType, User } from '@prisma/client'
import { ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService, getProfileUsername, slugify } from '@pubkeyapp/api/core/data-access'
import { PublicKey } from '@solana/web3.js'
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
    await this.core.data.user.update({
      where: { id: userId },
      data: { ...input, username: input.username ? getProfileUsername(input.username) : undefined },
      include: { identities: true },
    })
    await this.core.cache.del('user', `get-by-id:${userId}`)
    return this.core.getUserById(userId)
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
    const gumUserAccount = await this.core.gum.getUser(owner.publicKey)
    if (gumUserAccount && !owner.gumUser) {
      await this.connectGumUserAccount(userId, NetworkType.SolanaDevnet, gumUserAccount.cl_pubkey.toString())
    } else {
      this.logger.log(`User ${userId} is connected to Gum User ${owner.gumUser?.address}`)
      console.log('gumUserAccount', gumUserAccount.cl_pubkey.toString())
      console.log('owner.gumUser?.address', owner.gumUser?.address)
      console.log('owner.gumUser?.address', owner.gumUser)
      console.log('owner.gumUser?.profiles', owner.profiles)

      const profiles = await this.core.gum.sdk.profile.getProfilesByUser(new PublicKey(owner.publicKey))
      console.log('profiles', profiles)
    }

    // console.log('owner.gumUser', owner.gumUser)

    return this.core.getUserById(userId, true)
  }

  private async connectGumUserAccount(userId: string, network: NetworkType, address: string) {
    const account = await this.account.userGetAccount(userId, network, address)
    if (!account) {
      throw new Error('Account not found')
    }
    await this.core.data.account.update({
      where: { id: account.id },
      data: { type: AccountType.GumUser, gumUser: { connect: { id: userId } } },
    })
    await this.core.data.user.update({
      where: { id: userId },
      data: {
        gumUser: { connect: { address_network: { address, network } } },
      },
    })
    this.logger.log(`User ${userId} connected to Gum User ${address} on ${network}`)
  }
}
