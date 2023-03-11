import { Injectable, Logger } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService, getProfileUsername } from '@pubkeyapp/api/core/data-access'
import { createNewPage } from '@pubkeyapp/api/page/data-access'
import { getProfileTypeColor } from './api-profile-helpers'
import { UserUpdateProfileInput } from './dto/user-update-profile.input'
import { ProfileType } from './entity/profile-type.enum'

@Injectable()
export class ApiUserProfileService {
  private readonly logger = new Logger(ApiUserProfileService.name)
  constructor(private readonly core: ApiCoreService, private readonly account: ApiAnonAccountService) {}

  async userGetProfile(userId: string, profileId: string) {
    return this.ensureProfileOwner(userId, profileId)
  }

  async userGetProfilePage(userId: string, profileId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.page.findFirst({
      where: { profileId },
      include: {
        profile: { include: { owner: true } },
        blocks: true,
        domains: { include: { domain: true } },
      },
    })
  }

  async userGetProfiles(userId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.profile.findMany({
      where: { ownerId: userId },
      include: {
        user: true,
        identities: true,
        page: { include: { domains: { include: { domain: true } } } },
      },
    })
  }

  async userCreateProfile(userId: string, type: ProfileType) {
    const user = await this.core.ensureUserActive(userId)

    const created = await this.core.data.profile.create({
      data: {
        type,
        ownerId: userId,
        color: getProfileTypeColor(type),
        bio: user.profile?.bio,
        name: user.profile?.name,
        username: user.profile?.username ?? user.username,
        avatarUrl: user.profile?.avatarUrl,
      },
    })
    await this.core.data.page.create({
      data: createNewPage({
        ownerId: userId,
        profileId: created.id,
      }),
    })
    // aw
    // page: {
    //           create: {
    //             owner: { connect: { id: userId } },
    //             status: PageStatus.Draft,
    //             blocks: {
    //               create: [{ type: PageBlockType.Header, data: { text: '## Hello, World!' } }],
    //             },
    //           },
    //         },
    return this.userGetProfile(userId, created.id)
  }

  async userDeleteProfile(userId: string, profileId: string) {
    await this.ensureProfileOwner(userId, profileId)
    return this.core.data.profile.delete({ where: { id: profileId } })
  }

  async userUpdateProfile(userId: string, profileId: string, input: UserUpdateProfileInput) {
    await this.ensureProfileOwner(userId, profileId)
    const updated = await this.core.data.profile.update({
      where: { id: profileId },
      data: { ...input, username: input.username ? getProfileUsername(input.username) : undefined },
    })
    await this.core.getUserById(userId, true)
    return updated
  }

  async userLinkProfileIdentity(userId: string, profileId: string, identityId: string) {
    await this.ensureProfileOwner(userId, profileId)
    return this.core.data.profile.update({
      where: { id: profileId },
      data: { identities: { connect: { id: identityId } } },
    })
  }

  async userUnlinkProfileIdentity(userId: string, profileId: string, identityId: string) {
    await this.ensureProfileOwner(userId, profileId)
    return this.core.data.profile.update({
      where: { id: profileId },
      data: { identities: { disconnect: { id: identityId } } },
    })
  }

  async userSetDefaultProfile(userId: string, profileId: string) {
    await this.ensureProfileOwner(userId, profileId)
    await this.core.data.user.update({
      where: { id: userId },
      data: { profileId },
    })
    return this.core.getUserById(userId, true)
  }

  async ensureProfileOwner(userId: string, profileId: string) {
    await this.core.ensureUserActive(userId)
    const profile = await this.core.data.profile.findUnique({
      where: { id: profileId },
      include: {
        owner: { include: { profile: true } },
        page: {
          include: {
            blocks: true,
            domains: { include: { domain: true } },
          },
        },
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

  async userSyncProfile(userId: string, profileId: string) {
    const user = await this.core.ensureUserActive(userId)
    if (!user.publicKey) {
      throw new Error('User does not have a public key')
    }
    // const profile = await this.ensureProfileOwner(userId, profileId)
    // if (!profile.user) {
    //   throw new Error('Profile does not have a user')
    // }
    // Make sure the owner has a Gum Profile
    const owner = user.publicKey
    // const gumUser = await this.core.gum.getGumProfile(owner)

    const accounts: string[] = [
      user.publicKey.toString(),
      // gumUser.user.authority.toString(),
      // gumUser.user.cl_pubkey.toString(),
      // ...(gumUser?.profiles?.map((p) => p.cl_pubkey.toString()) || []),
      // ...(gumUser?.meta?.map((p) => p.cl_pubkey.toString()) || []),
    ]
    // console.log('gumUser', gumUser)
    // console.log('accounts', accounts)

    for (const account of accounts) {
      // console.log(' ==>> account', account)
      const accountInfo = await this.account.userGetAccount(userId, NetworkType.SolanaDevnet, account, true)
      console.log('accountInfo', accountInfo)
    }
  }
}
