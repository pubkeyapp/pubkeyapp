import { PublicKey } from '@solana/web3.js'

export type Namespace = 'Professional' | 'Personal' | 'Gaming' | 'Degen'
export const profileTypes = ['Personal', 'Professional', 'Gaming', 'Degen'] as const

export interface GumProfileMeta {
  metadataUri: string
  publicKey: PublicKey
}

export interface GumPost {
  metadataUri: string
  publicKey: PublicKey
  replyTo: PublicKey
}

export interface GumProfile {
  name: string
  publicKey: PublicKey
  metadata?: GumProfileMeta[]
  posts?: GumPost[]
}

export interface GumUser {
  owner: PublicKey
  publicKey: PublicKey
  profiles?: GumProfile[]
}

export interface GumProfileType {
  id: Namespace
  color?: string
}
export const gumProfileTypes: GumProfileType[] = [
  {
    id: 'Personal',
    color: 'green',
  },
  {
    id: 'Professional',
    color: 'blue',
  },
  {
    id: 'Gaming',
    color: 'yellow',
  },
  {
    id: 'Degen',
    color: 'red',
  },
]

export interface GumOwnerData {
  profileMetadataList: GumSDKProfileMeta[]
  profilesList: GumSDKProfile[]
  usersList: GumSDKUser[]
  postsList: GumSDKPost[]
}

export interface GumSDKProfile {
  publicKey: PublicKey
  account: {
    user: PublicKey
    namespace: {
      [key: string]: string
    }
  }
}
export interface GumSDKPost {
  publicKey: PublicKey
  account: {
    profile: PublicKey
    metadataUri: string
    replyTo: PublicKey
  }
}
export interface GumSDKProfileMeta {
  publicKey: PublicKey
  account: {
    profile: PublicKey
    metadataUri: string
  }
}
export interface GumSDKUser {
  publicKey: PublicKey
  account: {
    authority: PublicKey
    randomHash: number[]
  }
}
