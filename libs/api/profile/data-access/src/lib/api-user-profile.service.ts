import { Injectable, Logger } from '@nestjs/common'
import { AccountType, NetworkType } from '@prisma/client'
import { ApiAnonAccountService } from '@pubkeyapp/api/account/data-access'
import { ApiCoreService, getProfileUsername } from '@pubkeyapp/api/core/data-access'
import { createNewPage } from '@pubkeyapp/api/page/data-access'
import { ApiUserUserService } from '@pubkeyapp/api/user/data-access'
import { PublicKey } from '@solana/web3.js'
import { getProfileTypeColor } from './api-profile-helpers'
import { UserUpdateProfileInput } from './dto/user-update-profile.input'
import { ProfileType } from './entity/profile-type.enum'
import { ProfileVerification } from './entity/profile-verification.entity'

@Injectable()
export class ApiUserProfileService {
  private readonly logger = new Logger(ApiUserProfileService.name)
  constructor(
    private readonly core: ApiCoreService,
    private readonly account: ApiAnonAccountService,
    private readonly user: ApiUserUserService,
  ) {}

  async userGetProfile(userId: string, profileId: string) {
    return this.ensureProfileOwner(userId, profileId)
  }

  async userGetProfilePage(userId: string, profileId: string) {
    await this.core.ensureUserActive(userId)
    return this.core.data.page.findFirst({
      where: { profileId },
      include: {
        profile: { include: { owner: { include: { gumUser: true } } } },
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
        gumProfile: true,
        gumProfileMeta: true,
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
        identities: { connect: { id: user.identity.id } },
      },
    })

    if (!user.profile) {
      await this.userSetDefaultProfile(userId, created.id)
    }

    await this.core.data.page.create({
      data: createNewPage({
        ownerId: userId,
        profileId: created.id,
      }),
    })
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
    return this.userGetProfile(userId, updated.id)
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
        gumProfile: true,
        gumProfileMeta: true,
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

  async userVerifyProfile(userId: string, profileId: string): Promise<ProfileVerification> {
    const owner = await this.user.userVerifyUser(userId)
    if (!owner.profile) {
      throw new Error('User does not have a profile')
    }

    const profile = await this.ensureProfileOwner(userId, profileId)
    //
    // const accounts = await this.core.data.account.findMany({
    //   where: { network: NetworkType.SolanaDevnet, identityId: owner.identity.id },
    // })

    // - Does the user have a Gum User?
    const gumProfile = await this.core.gum.getProfile(owner.publicKey, profile.type)

    if (!gumProfile) {
      console.log('I will need to create a Gum Profile for you')
      console.log('gumProfile', gumProfile, profile.type)
      return null
    } else {
      if (!profile.gumProfile) {
        console.log('I will need to link your Gum Profile to your Profile')
        console.log('gumProfile', gumProfile, profile.type)
        await this.account.connectGumProfileAccount(
          userId,
          profile.id,
          NetworkType.SolanaDevnet,
          gumProfile.cl_pubkey.toString(),
        )
      }
    }

    // console.log('gumUser', { gumUserAccount, gumProfile })

    // const gumProfile = await this.core.gum.getGumProfile(owner.publicKey)

    // - Does the user have a Gum Profile of this type?
    // - Does the user have a Gum Meta of this type?

    // const gumUser = await this.core.data.account.findFirst({
    //   where: { network: NetworkType.SolanaDevnet, identityId: owner.identity.id, type: AccountType.GumUser },
    // })

    return {
      // gumProfile,
      // gumProfileMeta,
      // gumUser,
    }
  }

  userVerifyGumProfile() {
    // - Does the user have a Gum Profile of this type?
    // - Does the user have a Gum Meta of this type?
  }

  async userVerifyUser(userId: string) {
    const owner = await this.user.userVerifyUser(userId)
    const gumUserAccount = await this.core.gum.getUser(owner.publicKey)
    if (gumUserAccount && !owner.gumUser) {
      await this.connectGumUserAccount(userId, NetworkType.SolanaDevnet, gumUserAccount.cl_pubkey.toString())
    } else {
      this.logger.log(`User ${userId} is connected to Gum User ${owner.gumUser?.address}`)
      console.log('gumUserAccount', gumUserAccount.cl_pubkey.toString())
      console.log('owner.gumUser?.address', owner.gumUser?.address)
      console.log('owner.gumUser?.address', owner.gumUser)
      console.log('owner.gumUser?.profiles', owner.profiles)

      const gumProfiles = await this.core.gum.sdk.profile.getProfilesByUser(new PublicKey(owner.publicKey))
      const profiles = gumProfiles.map((p) => {
        const type = Object.keys(JSON.parse(p.namespace))[0]
        return {
          address: p.cl_pubkey.toString(),
          type: Object.keys(ProfileType).find((k) => k.toLowerCase() === type),
        }
      })
      const gumProfileNames = gumProfiles.map((p) => Object.keys(JSON.parse(p.namespace))[0])
      const ownerProfileTypes = owner.profiles.map((p) => p.type.toString().toLowerCase())
      // find missing profiles
      const missing = gumProfileNames.filter((p) => !ownerProfileTypes.includes(p))

      // Match the lowercase missing profiles to the with the enum that has uppercase first letter
      const missingEnums: ProfileType[] = missing.map((p) => {
        const enumValue = Object.keys(ProfileType).find((k) => k.toLowerCase() === p)
        if (!enumValue) {
          this.logger.verbose(`Profile type ${p} not found`)
        }
        return ProfileType[enumValue]
      })
      // console.log(
      //   'profiles',
      //   profiles,
      //   profileNames,
      //   owner.profiles.map((p) => p.type),
      // )
      console.log('profiles', gumProfileNames, { missing, missingEnums })

      if (missing.length) {
        console.log('I will need to create a Gum Profile for you -> ')
        // Loop over the enums
        for (const type of missingEnums) {
          const found = profiles.find((p) => p.type === type)
          console.log(' - ', type, ' ->', found)
          // Create the profile
          const profile = await this.userCreateProfile(userId, type)
          // Connect the profile to the user
          await this.account.connectGumProfileAccount(
            userId,
            profile.id,
            NetworkType.SolanaDevnet,
            found.address,
            owner.identity.id,
          )
        }
      }
    }
    // console.log('owner.profiles', owner.profiles)

    // console.log('owner.gumUser', owner.gumUser)
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
