import { SDK } from '@gumhq/react-sdk'
import { PublicKey } from '@solana/web3.js'
import { GumOwnerData, GumSDKUser, GumUser } from './gum-interfaces'

export async function gumGetOwnerData(owner: PublicKey, sdk: SDK): Promise<GumOwnerData> {
  const [profileMetadataList, profilesList, usersList, postsList] = await Promise.all([
    sdk.profileMetadata.getProfileMetadataAccountsByUser(owner),
    sdk.profile.getProfileAccountsByUser(owner),
    sdk.user.getUserAccountsByUser(owner),
    sdk.post.getPostAccountsByUser(owner),
  ])

  return {
    profileMetadataList: profileMetadataList.flat(),
    profilesList,
    usersList: usersList as GumSDKUser[],
    postsList,
  }
}

export function formatOwnerData(account: GumOwnerData): GumUser[] {
  return account?.usersList.map((user) => ({
    owner: user.account.authority,
    publicKey: user.publicKey,
    profiles: account?.profilesList
      .filter((profile) => profile.account.user.equals(user.publicKey))
      .map((profile) => ({
        name: Object.keys(profile?.account?.namespace)[0].toString(),
        publicKey: profile.publicKey,
        metadata: account?.profileMetadataList
          .filter((metadata) => metadata?.account?.profile.equals(profile.publicKey))
          .map((item) => ({
            metadataUri: item.account.metadataUri,
            publicKey: item.publicKey,
          })),
        posts: account.postsList
          .filter((post) => post.account.profile.equals(profile.publicKey))
          .map((post) => ({
            metadataUri: post.account.metadataUri,
            publicKey: post.publicKey,
            replyTo: post.account.replyTo,
          })),
      })),
  }))
}
