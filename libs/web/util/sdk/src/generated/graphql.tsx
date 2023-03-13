/* eslint-disable */
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any
}

export type Account = {
  __typename?: 'Account'
  address?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  discoveredAt?: Maybe<Scalars['DateTime']>
  discoveredBy?: Maybe<User>
  explorerUrl?: Maybe<Scalars['String']>
  gumProfile?: Maybe<Profile>
  gumProfileMeta?: Maybe<Profile>
  gumUser?: Maybe<User>
  id?: Maybe<Scalars['String']>
  identity?: Maybe<Identity>
  metadata?: Maybe<Scalars['JSON']>
  name?: Maybe<Scalars['String']>
  network?: Maybe<NetworkType>
  owner?: Maybe<Account>
  program?: Maybe<Scalars['String']>
  tokens?: Maybe<Array<Account>>
  type?: Maybe<AccountType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum AccountType {
  Account = 'Account',
  BonfidaDomain = 'BonfidaDomain',
  BonfidaTwitter = 'BonfidaTwitter',
  GumProfile = 'GumProfile',
  GumProfileMeta = 'GumProfileMeta',
  GumUser = 'GumUser',
  MetaplexNft = 'MetaplexNFT',
  Mint = 'Mint',
  Program = 'Program',
  System = 'System',
  Token = 'Token',
}

export type AdminAddPageBlockInput = {
  data?: InputMaybe<Scalars['JSON']>
  order?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<PageBlockType>
}

export type AdminAddPageDomainInput = {
  domainId: Scalars['String']
  path: Scalars['String']
}

export type AdminCreateDomainInput = {
  name: Scalars['String']
  ownerId?: InputMaybe<Scalars['String']>
  premium?: InputMaybe<Scalars['Boolean']>
  private?: InputMaybe<Scalars['Boolean']>
  secure?: InputMaybe<Scalars['Boolean']>
}

export type AdminCreateInviteInput = {
  expiresAt?: InputMaybe<Scalars['String']>
  maxUses?: InputMaybe<Scalars['Int']>
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminCreatePageInput = {
  color?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  ownerId?: InputMaybe<Scalars['String']>
  profileId: Scalars['String']
  title: Scalars['String']
  type?: InputMaybe<PageType>
}

export type AdminCreatePlanInput = {
  active?: InputMaybe<Scalars['Boolean']>
  currency?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
  priceMonth?: InputMaybe<Scalars['Int']>
  priceYear?: InputMaybe<Scalars['Int']>
  recommended?: InputMaybe<Scalars['Boolean']>
}

export type AdminCreateUserInput = {
  publicKey?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
}

export type AdminGetAccountsInput = {
  address?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  network?: InputMaybe<NetworkType>
  program?: InputMaybe<Scalars['String']>
  type?: InputMaybe<AccountType>
}

export type AdminGetDomainsInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminGetInvitesInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminGetPagesInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminGetPlansInput = {
  id?: InputMaybe<Scalars['String']>
}

export type AdminGetProfilesInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminUpdateDomainInput = {
  order?: InputMaybe<Scalars['Int']>
  premium?: InputMaybe<Scalars['Boolean']>
  private?: InputMaybe<Scalars['Boolean']>
  secure?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateInviteInput = {
  expiresAt?: InputMaybe<Scalars['Timestamp']>
  maxUses?: InputMaybe<Scalars['Int']>
}

export type AdminUpdatePageBlockInput = {
  data?: InputMaybe<Scalars['JSON']>
  order?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<PageBlockType>
}

export type AdminUpdatePageInput = {
  color?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  profileId?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type AdminUpdatePlanInput = {
  available?: InputMaybe<Scalars['Boolean']>
  currency?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  priceMonth?: InputMaybe<Scalars['Int']>
  priceYear?: InputMaybe<Scalars['Int']>
  recommended?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateProfileInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  bio?: InputMaybe<Scalars['String']>
  color?: InputMaybe<Scalars['String']>
  followers?: InputMaybe<Scalars['Int']>
  following?: InputMaybe<Scalars['Int']>
  metaUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  type?: InputMaybe<ProfileType>
  username?: InputMaybe<Scalars['String']>
}

export type AdminUpdateUserInput = {
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']>
}

export type AuthChallengeRequest = {
  __typename?: 'AuthChallengeRequest'
  challenge: Scalars['String']
  expiresAt: Scalars['String']
}

export type Cluster = {
  __typename?: 'Cluster'
  endpoint: Scalars['String']
  explorerUrl: Scalars['String']
  id: Scalars['String']
  name: Scalars['String']
  type: ClusterType
}

export enum ClusterType {
  Custom = 'Custom',
  Devnet = 'Devnet',
  Mainnet = 'Mainnet',
  Testnet = 'Testnet',
}

export type Config = {
  __typename?: 'Config'
  api: ConfigApi
  app: ConfigApp
  cluster: Cluster
  clusters: Array<Cluster>
}

export type ConfigApi = {
  __typename?: 'ConfigApi'
  name: Scalars['String']
  url: Scalars['String']
  version: Scalars['String']
}

export type ConfigApp = {
  __typename?: 'ConfigApp'
  description: Scalars['String']
  name: Scalars['String']
  url: Scalars['String']
}

export type Domain = {
  __typename?: 'Domain'
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  owner?: Maybe<User>
  pages?: Maybe<Array<Page>>
  premium?: Maybe<Scalars['Boolean']>
  private?: Maybe<Scalars['Boolean']>
  secure?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type Follow = {
  __typename?: 'Follow'
  createdAt?: Maybe<Scalars['DateTime']>
  follower?: Maybe<User>
  followerId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type Identity = {
  __typename?: 'Identity'
  accounts?: Maybe<Array<Account>>
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']>
  provider?: Maybe<IdentityProvider>
  providerId: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  verified: Scalars['Boolean']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Github = 'Github',
  Google = 'Google',
  Solana = 'Solana',
  Twitter = 'Twitter',
}

export type Invite = {
  __typename?: 'Invite'
  code?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  expiresAt?: Maybe<Scalars['Timestamp']>
  id?: Maybe<Scalars['String']>
  inviteUrl?: Maybe<Scalars['String']>
  isExpired?: Maybe<Scalars['Boolean']>
  isUsedUp?: Maybe<Scalars['Boolean']>
  maxUses?: Maybe<Scalars['Int']>
  owner?: Maybe<User>
  updatedAt?: Maybe<Scalars['DateTime']>
  useCount?: Maybe<Scalars['Int']>
  users?: Maybe<Array<User>>
}

export type Job = {
  __typename?: 'Job'
  attemptsMade?: Maybe<Scalars['Int']>
  data?: Maybe<Scalars['JSON']>
  failedReason?: Maybe<Scalars['String']>
  finishedOn?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  opts?: Maybe<Scalars['JSON']>
  processedOn?: Maybe<Scalars['Int']>
  returnvalue?: Maybe<Scalars['JSON']>
  stacktrace?: Maybe<Array<Scalars['String']>>
  timestamp?: Maybe<Scalars['Int']>
}

export enum JobStatus {
  Active = 'active',
  Completed = 'completed',
  Delayed = 'delayed',
  Failed = 'failed',
  Paused = 'paused',
  Waiting = 'waiting',
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddPageBlock?: Maybe<PageBlock>
  adminAddPageDomain?: Maybe<PageDomain>
  adminCleanQueue?: Maybe<Scalars['Boolean']>
  adminCreateDomain?: Maybe<Domain>
  adminCreateInvite?: Maybe<Invite>
  adminCreatePage?: Maybe<Page>
  adminCreatePlan?: Maybe<Plan>
  adminCreateUser?: Maybe<User>
  adminDeleteAccount?: Maybe<Scalars['Boolean']>
  adminDeleteDomain?: Maybe<Domain>
  adminDeleteInvite?: Maybe<Invite>
  adminDeletePage?: Maybe<Page>
  adminDeletePlan?: Maybe<Plan>
  adminDeleteProfile?: Maybe<Profile>
  adminDeleteQueueJob?: Maybe<Scalars['Boolean']>
  adminDeleteUser?: Maybe<User>
  adminIndexGumAccounts?: Maybe<Scalars['JSON']>
  adminPauseQueue?: Maybe<Scalars['Boolean']>
  adminRemovePageBlock?: Maybe<PageBlock>
  adminRemovePageDomain?: Maybe<PageDomain>
  adminResumeQueue?: Maybe<Scalars['Boolean']>
  adminSetSetting?: Maybe<Setting>
  adminUpdateDomain?: Maybe<Domain>
  adminUpdateInvite?: Maybe<Invite>
  adminUpdatePage?: Maybe<Page>
  adminUpdatePageBlock?: Maybe<PageBlock>
  adminUpdatePlan?: Maybe<Plan>
  adminUpdateProfile?: Maybe<Profile>
  adminUpdateUser?: Maybe<User>
  anonRespondChallenge?: Maybe<User>
  userAcceptInvite?: Maybe<Invite>
  userAddPageBlock?: Maybe<PageBlock>
  userCreatePage?: Maybe<Page>
  userCreateProfile?: Maybe<Profile>
  userDeleteIdentity?: Maybe<User>
  userDeletePage?: Maybe<Page>
  userDeleteProfile?: Maybe<Profile>
  userFollowUser?: Maybe<User>
  userLinkIdentity?: Maybe<User>
  userLinkProfileIdentity?: Maybe<Profile>
  userLogout?: Maybe<Scalars['Boolean']>
  userRemovePageBlock?: Maybe<PageBlock>
  userSearch?: Maybe<SearchResult>
  userSetDefaultProfile?: Maybe<Profile>
  userSyncIdentity?: Maybe<Identity>
  userSyncProfile?: Maybe<Profile>
  userUnfollowUser?: Maybe<User>
  userUnlinkProfileIdentity?: Maybe<Profile>
  userUpdatePage?: Maybe<Page>
  userUpdatePageBlock?: Maybe<PageBlock>
  userUpdateProfile?: Maybe<Profile>
  userUpdateUser?: Maybe<User>
  userVerifyProfile?: Maybe<Profile>
  userVerifyUser?: Maybe<User>
}

export type MutationAdminAddPageBlockArgs = {
  input: AdminAddPageBlockInput
  pageId: Scalars['String']
}

export type MutationAdminAddPageDomainArgs = {
  input: AdminAddPageDomainInput
  pageId: Scalars['String']
}

export type MutationAdminCleanQueueArgs = {
  type: QueueType
}

export type MutationAdminCreateDomainArgs = {
  input: AdminCreateDomainInput
}

export type MutationAdminCreateInviteArgs = {
  input: AdminCreateInviteInput
}

export type MutationAdminCreatePageArgs = {
  input: AdminCreatePageInput
}

export type MutationAdminCreatePlanArgs = {
  input: AdminCreatePlanInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteAccountArgs = {
  accountId: Scalars['String']
}

export type MutationAdminDeleteDomainArgs = {
  domainId: Scalars['String']
}

export type MutationAdminDeleteInviteArgs = {
  inviteId: Scalars['String']
}

export type MutationAdminDeletePageArgs = {
  pageId: Scalars['String']
}

export type MutationAdminDeletePlanArgs = {
  planId: Scalars['String']
}

export type MutationAdminDeleteProfileArgs = {
  profileId: Scalars['String']
}

export type MutationAdminDeleteQueueJobArgs = {
  jobId: Scalars['String']
  type: QueueType
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminPauseQueueArgs = {
  type: QueueType
}

export type MutationAdminRemovePageBlockArgs = {
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationAdminRemovePageDomainArgs = {
  pageDomainId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationAdminResumeQueueArgs = {
  type: QueueType
}

export type MutationAdminSetSettingArgs = {
  key: Scalars['String']
  value: Scalars['String']
}

export type MutationAdminUpdateDomainArgs = {
  domainId: Scalars['String']
  input: AdminUpdateDomainInput
}

export type MutationAdminUpdateInviteArgs = {
  input: AdminUpdateInviteInput
  inviteId: Scalars['String']
}

export type MutationAdminUpdatePageArgs = {
  input: AdminUpdatePageInput
  pageId: Scalars['String']
}

export type MutationAdminUpdatePageBlockArgs = {
  input: AdminUpdatePageBlockInput
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationAdminUpdatePlanArgs = {
  input: AdminUpdatePlanInput
  planId: Scalars['String']
}

export type MutationAdminUpdateProfileArgs = {
  input: AdminUpdateProfileInput
  profileId: Scalars['String']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']
}

export type MutationAnonRespondChallengeArgs = {
  challenge: Scalars['String']
  publicKey: Scalars['String']
  signature: Scalars['String']
}

export type MutationUserAcceptInviteArgs = {
  code: Scalars['String']
}

export type MutationUserAddPageBlockArgs = {
  input: UserAddPageBlockInput
  pageId: Scalars['String']
}

export type MutationUserCreatePageArgs = {
  input: UserCreatePageInput
}

export type MutationUserCreateProfileArgs = {
  type: ProfileType
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationUserDeletePageArgs = {
  pageId: Scalars['String']
}

export type MutationUserDeleteProfileArgs = {
  profileId: Scalars['String']
}

export type MutationUserFollowUserArgs = {
  username: Scalars['String']
}

export type MutationUserLinkIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']
}

export type MutationUserLinkProfileIdentityArgs = {
  identityId: Scalars['String']
  profileId: Scalars['String']
}

export type MutationUserRemovePageBlockArgs = {
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationUserSearchArgs = {
  input: UserSearchInput
}

export type MutationUserSetDefaultProfileArgs = {
  profileId: Scalars['String']
}

export type MutationUserSyncIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationUserSyncProfileArgs = {
  profileId: Scalars['String']
}

export type MutationUserUnfollowUserArgs = {
  username: Scalars['String']
}

export type MutationUserUnlinkProfileIdentityArgs = {
  identityId: Scalars['String']
  profileId: Scalars['String']
}

export type MutationUserUpdatePageArgs = {
  input: UserUpdatePageInput
  pageId: Scalars['String']
}

export type MutationUserUpdatePageBlockArgs = {
  input: UserUpdatePageBlockInput
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationUserUpdateProfileArgs = {
  input: UserUpdateProfileInput
  profileId: Scalars['String']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyProfileArgs = {
  profileId: Scalars['String']
}

export enum NetworkType {
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
  SolanaTestnet = 'SolanaTestnet',
}

export type Page = {
  __typename?: 'Page'
  blocks?: Maybe<Array<PageBlock>>
  color?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  domains?: Maybe<Array<PageDomain>>
  id?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  profile?: Maybe<Profile>
  siteUrl?: Maybe<Scalars['String']>
  status?: Maybe<PageStatus>
  title?: Maybe<Scalars['String']>
  type?: Maybe<PageType>
  updatedAt?: Maybe<Scalars['DateTime']>
  urls?: Maybe<Array<Scalars['String']>>
  viewUrl?: Maybe<Scalars['String']>
}

export type PageBlock = {
  __typename?: 'PageBlock'
  createdAt?: Maybe<Scalars['DateTime']>
  data?: Maybe<Scalars['JSON']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  page?: Maybe<Page>
  type?: Maybe<PageBlockType>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export enum PageBlockType {
  Discord = 'Discord',
  Github = 'Github',
  Google = 'Google',
  Header = 'Header',
  Link = 'Link',
  Solana = 'Solana',
  Twitter = 'Twitter',
}

export type PageDomain = {
  __typename?: 'PageDomain'
  createdAt?: Maybe<Scalars['DateTime']>
  domain?: Maybe<Domain>
  id?: Maybe<Scalars['String']>
  page?: Maybe<Page>
  path?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  viewUrl?: Maybe<Scalars['String']>
}

export enum PageStatus {
  Demo = 'Demo',
  Draft = 'Draft',
  Published = 'Published',
}

export enum PageType {
  Degen = 'Degen',
  Gaming = 'Gaming',
  Personal = 'Personal',
  Professional = 'Professional',
}

export type Plan = {
  __typename?: 'Plan'
  available?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['DateTime']>
  currency?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  features?: Maybe<Array<PlanFeature>>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  priceMonth?: Maybe<Scalars['Int']>
  priceYear?: Maybe<Scalars['Int']>
  recommended?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type PlanFeature = {
  __typename?: 'PlanFeature'
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type Profile = {
  __typename?: 'Profile'
  avatarUrl?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
  color?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  followers?: Maybe<Scalars['Int']>
  following?: Maybe<Scalars['Int']>
  gumProfile?: Maybe<Account>
  gumProfileMeta?: Maybe<Account>
  id?: Maybe<Scalars['String']>
  identities?: Maybe<Array<Identity>>
  metaUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  page?: Maybe<Page>
  status?: Maybe<ProfileStatus>
  type?: Maybe<ProfileType>
  updatedAt?: Maybe<Scalars['DateTime']>
  username?: Maybe<Scalars['String']>
}

export enum ProfileStatus {
  Demo = 'Demo',
  Draft = 'Draft',
  Published = 'Published',
}

export enum ProfileType {
  Degen = 'Degen',
  Gaming = 'Gaming',
  Personal = 'Personal',
  Professional = 'Professional',
}

export type Query = {
  __typename?: 'Query'
  adminGetAccount?: Maybe<Account>
  adminGetAccounts?: Maybe<Array<Account>>
  adminGetDomain?: Maybe<Domain>
  adminGetDomains?: Maybe<Array<Domain>>
  adminGetInvite?: Maybe<Invite>
  adminGetInvites?: Maybe<Array<Invite>>
  adminGetPage?: Maybe<Page>
  adminGetPageDomain?: Maybe<PageDomain>
  adminGetPages?: Maybe<Array<Page>>
  adminGetPlan?: Maybe<Plan>
  adminGetPlans?: Maybe<Array<Plan>>
  adminGetProfile?: Maybe<Profile>
  adminGetProfiles?: Maybe<Array<Profile>>
  adminGetQueue?: Maybe<Queue>
  adminGetQueueJobs?: Maybe<Array<Job>>
  adminGetQueues?: Maybe<Array<Queue>>
  adminGetSettings?: Maybe<Array<Setting>>
  adminGetUser?: Maybe<User>
  adminGetUsers?: Maybe<Array<User>>
  anonGetInvite?: Maybe<Invite>
  anonGetPage?: Maybe<Page>
  anonGetPlans?: Maybe<Array<Plan>>
  anonGetUser?: Maybe<User>
  anonGetUserFollowers?: Maybe<Array<User>>
  anonGetUserFollowing?: Maybe<Array<User>>
  anonGetUserInvites?: Maybe<Array<Invite>>
  anonGetUserPages?: Maybe<Array<Page>>
  anonGetUserProfiles?: Maybe<Scalars['JSON']>
  anonRequestChallenge?: Maybe<AuthChallengeRequest>
  config?: Maybe<Config>
  getMe?: Maybe<User>
  uptime: Scalars['Float']
  userGetAccount?: Maybe<Account>
  userGetAccountHistory?: Maybe<Scalars['JSON']>
  userGetIdentities?: Maybe<Array<Identity>>
  userGetIdentity?: Maybe<Identity>
  userGetInvite?: Maybe<Invite>
  userGetInvites?: Maybe<Array<Invite>>
  userGetPage?: Maybe<Page>
  userGetProfile?: Maybe<Profile>
  userGetProfilePage?: Maybe<Page>
  userGetProfiles?: Maybe<Array<Profile>>
}

export type QueryAdminGetAccountArgs = {
  accountId: Scalars['String']
}

export type QueryAdminGetAccountsArgs = {
  input: AdminGetAccountsInput
}

export type QueryAdminGetDomainArgs = {
  domainId: Scalars['String']
}

export type QueryAdminGetDomainsArgs = {
  input?: InputMaybe<AdminGetDomainsInput>
}

export type QueryAdminGetInviteArgs = {
  inviteId: Scalars['String']
}

export type QueryAdminGetInvitesArgs = {
  input?: InputMaybe<AdminGetInvitesInput>
}

export type QueryAdminGetPageArgs = {
  pageId: Scalars['String']
}

export type QueryAdminGetPageDomainArgs = {
  domainId: Scalars['String']
  path: Scalars['String']
}

export type QueryAdminGetPagesArgs = {
  input?: InputMaybe<AdminGetPagesInput>
}

export type QueryAdminGetPlanArgs = {
  planId: Scalars['String']
}

export type QueryAdminGetPlansArgs = {
  input?: InputMaybe<AdminGetPlansInput>
}

export type QueryAdminGetProfileArgs = {
  profileId: Scalars['String']
}

export type QueryAdminGetProfilesArgs = {
  input?: InputMaybe<AdminGetProfilesInput>
}

export type QueryAdminGetQueueArgs = {
  type: QueueType
}

export type QueryAdminGetQueueJobsArgs = {
  statuses: Array<JobStatus>
  type: QueueType
}

export type QueryAdminGetUserArgs = {
  userId: Scalars['String']
}

export type QueryAnonGetInviteArgs = {
  code: Scalars['String']
}

export type QueryAnonGetPageArgs = {
  pageId: Scalars['String']
}

export type QueryAnonGetUserArgs = {
  username: Scalars['String']
}

export type QueryAnonGetUserFollowersArgs = {
  username: Scalars['String']
}

export type QueryAnonGetUserFollowingArgs = {
  username: Scalars['String']
}

export type QueryAnonGetUserInvitesArgs = {
  username: Scalars['String']
}

export type QueryAnonGetUserPagesArgs = {
  username: Scalars['String']
}

export type QueryAnonGetUserProfilesArgs = {
  username: Scalars['String']
}

export type QueryAnonRequestChallengeArgs = {
  publicKey: Scalars['String']
}

export type QueryUserGetAccountArgs = {
  address: Scalars['String']
  network: NetworkType
  refresh?: InputMaybe<Scalars['Boolean']>
}

export type QueryUserGetAccountHistoryArgs = {
  address: Scalars['String']
  network: NetworkType
}

export type QueryUserGetIdentityArgs = {
  identityId: Scalars['String']
}

export type QueryUserGetPageArgs = {
  pageId: Scalars['String']
}

export type QueryUserGetProfileArgs = {
  profileId: Scalars['String']
}

export type QueryUserGetProfilePageArgs = {
  profileId: Scalars['String']
}

export type Queue = {
  __typename?: 'Queue'
  count?: Maybe<QueueCount>
  info?: Maybe<Scalars['JSON']>
  isPaused?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  type: QueueType
}

export type QueueCount = {
  __typename?: 'QueueCount'
  active?: Maybe<Scalars['Int']>
  completed?: Maybe<Scalars['Int']>
  delayed?: Maybe<Scalars['Int']>
  failed?: Maybe<Scalars['Int']>
  paused?: Maybe<Scalars['Int']>
  waiting?: Maybe<Scalars['Int']>
}

export enum QueueType {
  AccountClose = 'AccountClose',
  AccountDiscover = 'AccountDiscover',
  BlockParse = 'BlockParse',
}

export type SearchResult = {
  __typename?: 'SearchResult'
  accounts?: Maybe<Array<Account>>
  users?: Maybe<Array<User>>
}

export type Setting = {
  __typename?: 'Setting'
  createdAt?: Maybe<Scalars['DateTime']>
  default?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  value?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  createdAt?: Maybe<Scalars['DateTime']>
  followers?: Maybe<Array<Follow>>
  followersCount?: Maybe<Scalars['Int']>
  following?: Maybe<Array<Follow>>
  followingCount?: Maybe<Scalars['Int']>
  gumUser?: Maybe<Account>
  id?: Maybe<Scalars['String']>
  identities?: Maybe<Array<Identity>>
  pid?: Maybe<Scalars['Int']>
  profile?: Maybe<Profile>
  profileUrl?: Maybe<Scalars['String']>
  profiles?: Maybe<Array<Profile>>
  publicKey?: Maybe<Scalars['String']>
  relation?: Maybe<UserRelation>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']>
  username?: Maybe<Scalars['String']>
}

export type UserAddPageBlockInput = {
  data?: InputMaybe<Scalars['JSON']>
  order?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<PageBlockType>
}

export type UserCreatePageInput = {
  profileId?: InputMaybe<Scalars['String']>
}

export type UserRelation = {
  __typename?: 'UserRelation'
  isFollowedByYou: Scalars['Boolean']
  isFollowingYou: Scalars['Boolean']
  isYou: Scalars['Boolean']
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export type UserSearchInput = {
  query: Scalars['String']
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdatePageBlockInput = {
  data?: InputMaybe<Scalars['JSON']>
  order?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<PageBlockType>
}

export type UserUpdatePageInput = {
  color?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
}

export type UserUpdateProfileInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  bio?: InputMaybe<Scalars['String']>
  color?: InputMaybe<Scalars['String']>
  metaUrl?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
}

export type UserUpdateUserInput = {
  username?: InputMaybe<Scalars['String']>
}

export type AccountSummaryFragment = {
  __typename?: 'Account'
  id?: string | null
  name?: string | null
  type?: AccountType | null
  address?: string | null
  network?: NetworkType | null
  explorerUrl?: string | null
}

export type AccountDetailsFragment = {
  __typename?: 'Account'
  id?: string | null
  updatedAt?: any | null
  createdAt?: any | null
  name?: string | null
  program?: string | null
  metadata?: any | null
  network?: NetworkType | null
  type?: AccountType | null
  address?: string | null
  explorerUrl?: string | null
  discoveredAt?: any | null
  discoveredBy?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
  identity?: {
    __typename?: 'Identity'
    id?: string | null
    provider?: IdentityProvider | null
    providerId: string
    profile?: any | null
    verified: boolean
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminIndexGumAccountsMutationVariables = Exact<{ [key: string]: never }>

export type AdminIndexGumAccountsMutation = { __typename?: 'Mutation'; item?: any | null }

export type AdminDeleteAccountMutationVariables = Exact<{
  accountId: Scalars['String']
}>

export type AdminDeleteAccountMutation = { __typename?: 'Mutation'; item?: boolean | null }

export type AdminGetAccountsQueryVariables = Exact<{
  input: AdminGetAccountsInput
}>

export type AdminGetAccountsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Account'
    id?: string | null
    updatedAt?: any | null
    createdAt?: any | null
    name?: string | null
    program?: string | null
    metadata?: any | null
    network?: NetworkType | null
    type?: AccountType | null
    address?: string | null
    explorerUrl?: string | null
    discoveredAt?: any | null
    owner?: {
      __typename?: 'Account'
      id?: string | null
      updatedAt?: any | null
      createdAt?: any | null
      name?: string | null
      program?: string | null
      metadata?: any | null
      network?: NetworkType | null
      type?: AccountType | null
      address?: string | null
      explorerUrl?: string | null
      discoveredAt?: any | null
      discoveredBy?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      identity?: {
        __typename?: 'Identity'
        id?: string | null
        provider?: IdentityProvider | null
        providerId: string
        profile?: any | null
        verified: boolean
        owner?: {
          __typename?: 'User'
          id?: string | null
          pid?: number | null
          role?: UserRole | null
          status?: UserStatus | null
          createdAt?: any | null
          updatedAt?: any | null
          followersCount?: number | null
          followingCount?: number | null
          profileUrl?: string | null
          publicKey?: string | null
          username?: string | null
          relation?: {
            __typename?: 'UserRelation'
            isYou: boolean
            isFollowedByYou: boolean
            isFollowingYou: boolean
          } | null
          profile?: {
            __typename?: 'Profile'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            name?: string | null
            username?: string | null
            bio?: string | null
            avatarUrl?: string | null
            metaUrl?: string | null
            color?: string | null
            followers?: number | null
            following?: number | null
            type?: ProfileType | null
            gumProfile?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
            gumProfileMeta?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
          } | null
          gumUser?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
    } | null
    discoveredBy?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    identity?: {
      __typename?: 'Identity'
      id?: string | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
    } | null
  }> | null
}

export type AdminGetAccountQueryVariables = Exact<{
  accountId: Scalars['String']
}>

export type AdminGetAccountQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Account'
    id?: string | null
    updatedAt?: any | null
    createdAt?: any | null
    name?: string | null
    program?: string | null
    metadata?: any | null
    network?: NetworkType | null
    type?: AccountType | null
    address?: string | null
    explorerUrl?: string | null
    discoveredAt?: any | null
    owner?: {
      __typename?: 'Account'
      id?: string | null
      updatedAt?: any | null
      createdAt?: any | null
      name?: string | null
      program?: string | null
      metadata?: any | null
      network?: NetworkType | null
      type?: AccountType | null
      address?: string | null
      explorerUrl?: string | null
      discoveredAt?: any | null
      discoveredBy?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      identity?: {
        __typename?: 'Identity'
        id?: string | null
        provider?: IdentityProvider | null
        providerId: string
        profile?: any | null
        verified: boolean
        owner?: {
          __typename?: 'User'
          id?: string | null
          pid?: number | null
          role?: UserRole | null
          status?: UserStatus | null
          createdAt?: any | null
          updatedAt?: any | null
          followersCount?: number | null
          followingCount?: number | null
          profileUrl?: string | null
          publicKey?: string | null
          username?: string | null
          relation?: {
            __typename?: 'UserRelation'
            isYou: boolean
            isFollowedByYou: boolean
            isFollowingYou: boolean
          } | null
          profile?: {
            __typename?: 'Profile'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            name?: string | null
            username?: string | null
            bio?: string | null
            avatarUrl?: string | null
            metaUrl?: string | null
            color?: string | null
            followers?: number | null
            following?: number | null
            type?: ProfileType | null
            gumProfile?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
            gumProfileMeta?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
          } | null
          gumUser?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
    } | null
    tokens?: Array<{
      __typename?: 'Account'
      id?: string | null
      updatedAt?: any | null
      createdAt?: any | null
      name?: string | null
      program?: string | null
      metadata?: any | null
      network?: NetworkType | null
      type?: AccountType | null
      address?: string | null
      explorerUrl?: string | null
      discoveredAt?: any | null
      discoveredBy?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      identity?: {
        __typename?: 'Identity'
        id?: string | null
        provider?: IdentityProvider | null
        providerId: string
        profile?: any | null
        verified: boolean
        owner?: {
          __typename?: 'User'
          id?: string | null
          pid?: number | null
          role?: UserRole | null
          status?: UserStatus | null
          createdAt?: any | null
          updatedAt?: any | null
          followersCount?: number | null
          followingCount?: number | null
          profileUrl?: string | null
          publicKey?: string | null
          username?: string | null
          relation?: {
            __typename?: 'UserRelation'
            isYou: boolean
            isFollowedByYou: boolean
            isFollowingYou: boolean
          } | null
          profile?: {
            __typename?: 'Profile'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            name?: string | null
            username?: string | null
            bio?: string | null
            avatarUrl?: string | null
            metaUrl?: string | null
            color?: string | null
            followers?: number | null
            following?: number | null
            type?: ProfileType | null
            gumProfile?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
            gumProfileMeta?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
          } | null
          gumUser?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
    }> | null
    gumProfile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    discoveredBy?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    identity?: {
      __typename?: 'Identity'
      id?: string | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type UserGetAccountQueryVariables = Exact<{
  network: NetworkType
  address: Scalars['String']
}>

export type UserGetAccountQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Account'
    id?: string | null
    updatedAt?: any | null
    createdAt?: any | null
    name?: string | null
    program?: string | null
    metadata?: any | null
    network?: NetworkType | null
    type?: AccountType | null
    address?: string | null
    explorerUrl?: string | null
    discoveredAt?: any | null
    owner?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    tokens?: Array<{
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    }> | null
    gumProfile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    discoveredBy?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    identity?: {
      __typename?: 'Identity'
      id?: string | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type UserGetAccountHistoryQueryVariables = Exact<{
  network: NetworkType
  address: Scalars['String']
}>

export type UserGetAccountHistoryQuery = { __typename?: 'Query'; items?: any | null }

export type AuthChallengeRequestDetailsFragment = {
  __typename?: 'AuthChallengeRequest'
  challenge: string
  expiresAt: string
}

export type GetMeQueryVariables = Exact<{ [key: string]: never }>

export type GetMeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AnonRequestChallengeQueryVariables = Exact<{
  publicKey: Scalars['String']
}>

export type AnonRequestChallengeQuery = {
  __typename?: 'Query'
  result?: { __typename?: 'AuthChallengeRequest'; challenge: string; expiresAt: string } | null
}

export type UserLogoutMutationVariables = Exact<{ [key: string]: never }>

export type UserLogoutMutation = { __typename?: 'Mutation'; userLogout?: boolean | null }

export type AnonRespondChallengeMutationVariables = Exact<{
  challenge: Scalars['String']
  publicKey: Scalars['String']
  signature: Scalars['String']
}>

export type AnonRespondChallengeMutation = {
  __typename?: 'Mutation'
  result?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type ConfigDetailsFragment = {
  __typename?: 'Config'
  api: { __typename?: 'ConfigApi'; name: string; url: string; version: string }
  app: { __typename?: 'ConfigApp'; url: string }
  cluster: {
    __typename?: 'Cluster'
    id: string
    name: string
    type: ClusterType
    endpoint: string
    explorerUrl: string
  }
  clusters: Array<{
    __typename?: 'Cluster'
    id: string
    name: string
    type: ClusterType
    endpoint: string
    explorerUrl: string
  }>
}

export type ConfigApiDetailsFragment = { __typename?: 'ConfigApi'; name: string; url: string; version: string }

export type ConfigAppDetailsFragment = { __typename?: 'ConfigApp'; url: string }

export type ClusterDetailsFragment = {
  __typename?: 'Cluster'
  id: string
  name: string
  type: ClusterType
  endpoint: string
  explorerUrl: string
}

export type ConfigQueryVariables = Exact<{ [key: string]: never }>

export type ConfigQuery = {
  __typename?: 'Query'
  config?: {
    __typename?: 'Config'
    api: { __typename?: 'ConfigApi'; name: string; url: string; version: string }
    app: { __typename?: 'ConfigApp'; url: string }
    cluster: {
      __typename?: 'Cluster'
      id: string
      name: string
      type: ClusterType
      endpoint: string
      explorerUrl: string
    }
    clusters: Array<{
      __typename?: 'Cluster'
      id: string
      name: string
      type: ClusterType
      endpoint: string
      explorerUrl: string
    }>
  } | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type SettingDetailFragment = {
  __typename?: 'Setting'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  default?: string | null
  description?: string | null
  key?: string | null
  value?: string | null
}

export type AdminGetSettingsQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetSettingsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Setting'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    default?: string | null
    description?: string | null
    key?: string | null
    value?: string | null
  }> | null
}

export type AdminSetSettingMutationVariables = Exact<{
  key: Scalars['String']
  value: Scalars['String']
}>

export type AdminSetSettingMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Setting'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    default?: string | null
    description?: string | null
    key?: string | null
    value?: string | null
  } | null
}

export type DomainDetailsFragment = {
  __typename?: 'Domain'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  name?: string | null
  order?: number | null
  premium?: boolean | null
  private?: boolean | null
  secure?: boolean | null
  owner?: {
    __typename?: 'User'
    id?: string | null
    username?: string | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      name?: string | null
      username?: string | null
      avatarUrl?: string | null
      bio?: string | null
    } | null
  } | null
}

export type AdminGetDomainQueryVariables = Exact<{
  domainId: Scalars['String']
}>

export type AdminGetDomainQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Domain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    pages?: Array<{
      __typename?: 'Page'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      status?: PageStatus | null
      type?: PageType | null
      title?: string | null
      description?: string | null
      color?: string | null
      siteUrl?: string | null
      viewUrl?: string | null
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        name?: string | null
        username?: string | null
        avatarUrl?: string | null
        bio?: string | null
      } | null
    } | null
  } | null
}

export type AdminGetDomainsQueryVariables = Exact<{
  input?: InputMaybe<AdminGetDomainsInput>
}>

export type AdminGetDomainsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Domain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        name?: string | null
        username?: string | null
        avatarUrl?: string | null
        bio?: string | null
      } | null
    } | null
  }> | null
}

export type AdminCreateDomainMutationVariables = Exact<{
  input: AdminCreateDomainInput
}>

export type AdminCreateDomainMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Domain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        name?: string | null
        username?: string | null
        avatarUrl?: string | null
        bio?: string | null
      } | null
    } | null
  } | null
}

export type AdminUpdateDomainMutationVariables = Exact<{
  domainId: Scalars['String']
  input: AdminUpdateDomainInput
}>

export type AdminUpdateDomainMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Domain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        name?: string | null
        username?: string | null
        avatarUrl?: string | null
        bio?: string | null
      } | null
    } | null
  } | null
}

export type AdminDeleteDomainMutationVariables = Exact<{
  domainId: Scalars['String']
}>

export type AdminDeleteDomainMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Domain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        name?: string | null
        username?: string | null
        avatarUrl?: string | null
        bio?: string | null
      } | null
    } | null
  } | null
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  provider?: IdentityProvider | null
  providerId: string
  profile?: any | null
  verified: boolean
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']
}>

export type UserDeleteIdentityMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserGetIdentitiesQueryVariables = Exact<{ [key: string]: never }>

export type UserGetIdentitiesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    provider?: IdentityProvider | null
    providerId: string
    profile?: any | null
    verified: boolean
    accounts?: Array<{
      __typename?: 'Account'
      id?: string | null
      updatedAt?: any | null
      createdAt?: any | null
      name?: string | null
      program?: string | null
      metadata?: any | null
      network?: NetworkType | null
      type?: AccountType | null
      address?: string | null
      explorerUrl?: string | null
      discoveredAt?: any | null
      discoveredBy?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      identity?: {
        __typename?: 'Identity'
        id?: string | null
        provider?: IdentityProvider | null
        providerId: string
        profile?: any | null
        verified: boolean
        owner?: {
          __typename?: 'User'
          id?: string | null
          pid?: number | null
          role?: UserRole | null
          status?: UserStatus | null
          createdAt?: any | null
          updatedAt?: any | null
          followersCount?: number | null
          followingCount?: number | null
          profileUrl?: string | null
          publicKey?: string | null
          username?: string | null
          relation?: {
            __typename?: 'UserRelation'
            isYou: boolean
            isFollowedByYou: boolean
            isFollowingYou: boolean
          } | null
          profile?: {
            __typename?: 'Profile'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            name?: string | null
            username?: string | null
            bio?: string | null
            avatarUrl?: string | null
            metaUrl?: string | null
            color?: string | null
            followers?: number | null
            following?: number | null
            type?: ProfileType | null
            gumProfile?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
            gumProfileMeta?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
          } | null
          gumUser?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
    }> | null
  }> | null
}

export type UserGetIdentityQueryVariables = Exact<{
  identityId: Scalars['String']
}>

export type UserGetIdentityQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Identity'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    provider?: IdentityProvider | null
    providerId: string
    profile?: any | null
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserSyncIdentityMutationVariables = Exact<{
  identityId: Scalars['String']
}>

export type UserSyncIdentityMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Identity'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    provider?: IdentityProvider | null
    providerId: string
    profile?: any | null
    verified: boolean
  } | null
}

export type InviteDetailsFragment = {
  __typename?: 'Invite'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  expiresAt?: any | null
  code?: string | null
  maxUses?: number | null
  useCount?: number | null
  inviteUrl?: string | null
  isExpired?: boolean | null
  isUsedUp?: boolean | null
  owner?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminGetInviteQueryVariables = Exact<{
  inviteId: Scalars['String']
}>

export type AdminGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminGetInvitesQueryVariables = Exact<{
  input?: InputMaybe<AdminGetInvitesInput>
}>

export type AdminGetInvitesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  }> | null
}

export type AdminCreateInviteMutationVariables = Exact<{
  input: AdminCreateInviteInput
}>

export type AdminCreateInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminUpdateInviteMutationVariables = Exact<{
  inviteId: Scalars['String']
  input: AdminUpdateInviteInput
}>

export type AdminUpdateInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminDeleteInviteMutationVariables = Exact<{
  inviteId: Scalars['String']
}>

export type AdminDeleteInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AnonGetInviteQueryVariables = Exact<{
  code: Scalars['String']
}>

export type AnonGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserGetInvitesQueryVariables = Exact<{ [key: string]: never }>

export type UserGetInvitesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  }> | null
}

export type UserGetInviteQueryVariables = Exact<{ [key: string]: never }>

export type UserGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserAcceptInviteMutationVariables = Exact<{
  code: Scalars['String']
}>

export type UserAcceptInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    expiresAt?: any | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type PageBlockDetailsFragment = {
  __typename?: 'PageBlock'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  type?: PageBlockType | null
  data?: any | null
  order?: number | null
}

export type AdminAddPageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  input: AdminAddPageBlockInput
}>

export type AdminAddPageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type AdminRemovePageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  pageBlockId: Scalars['String']
}>

export type AdminRemovePageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type AdminUpdatePageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  pageBlockId: Scalars['String']
  input: AdminUpdatePageBlockInput
}>

export type AdminUpdatePageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type UserAddPageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  input: UserAddPageBlockInput
}>

export type UserAddPageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type UserRemovePageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  pageBlockId: Scalars['String']
}>

export type UserRemovePageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type UserUpdatePageBlockMutationVariables = Exact<{
  pageId: Scalars['String']
  pageBlockId: Scalars['String']
  input: UserUpdatePageBlockInput
}>

export type UserUpdatePageBlockMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      blocks?: Array<{ __typename?: 'PageBlock'; id?: string | null }> | null
    } | null
  } | null
}

export type PageDomainDetailsFragment = {
  __typename?: 'PageDomain'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  path?: string | null
  viewUrl?: string | null
  domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
  page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
}

export type AdminGetPageDomainQueryVariables = Exact<{
  domainId: Scalars['String']
  path: Scalars['String']
}>

export type AdminGetPageDomainQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'PageDomain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    path?: string | null
    viewUrl?: string | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      title?: string | null
      domains?: Array<{ __typename?: 'PageDomain'; id?: string | null }> | null
    } | null
    domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
  } | null
}

export type AdminAddPageDomainMutationVariables = Exact<{
  pageId: Scalars['String']
  input: AdminAddPageDomainInput
}>

export type AdminAddPageDomainMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageDomain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    path?: string | null
    viewUrl?: string | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      title?: string | null
      domains?: Array<{ __typename?: 'PageDomain'; id?: string | null }> | null
    } | null
    domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
  } | null
}

export type AdminRemovePageDomainMutationVariables = Exact<{
  pageId: Scalars['String']
  pageDomainId: Scalars['String']
}>

export type AdminRemovePageDomainMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'PageDomain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    path?: string | null
    viewUrl?: string | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      title?: string | null
      domains?: Array<{ __typename?: 'PageDomain'; id?: string | null }> | null
    } | null
    domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
  } | null
}

export type PageSummaryFragment = {
  __typename?: 'Page'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  status?: PageStatus | null
  type?: PageType | null
  siteUrl?: string | null
  viewUrl?: string | null
  domains?: Array<{
    __typename?: 'PageDomain'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    path?: string | null
    viewUrl?: string | null
    domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
    page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
  }> | null
}

export type PageDetailsFragment = {
  __typename?: 'Page'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  status?: PageStatus | null
  type?: PageType | null
  title?: string | null
  description?: string | null
  color?: string | null
  siteUrl?: string | null
  viewUrl?: string | null
  owner?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminGetPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type AdminGetPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    profile?: { __typename?: 'Profile'; id?: string | null } | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminGetPagesQueryVariables = Exact<{
  input?: InputMaybe<AdminGetPagesInput>
}>

export type AdminGetPagesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  }> | null
}

export type AdminCreatePageMutationVariables = Exact<{
  input: AdminCreatePageInput
}>

export type AdminCreatePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminUpdatePageMutationVariables = Exact<{
  pageId: Scalars['String']
  input: AdminUpdatePageInput
}>

export type AdminUpdatePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AdminDeletePageMutationVariables = Exact<{
  pageId: Scalars['String']
}>

export type AdminDeletePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type AnonGetPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type AnonGetPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserGetPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type UserGetPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserUpdatePageMutationVariables = Exact<{
  pageId: Scalars['String']
  input: UserUpdatePageInput
}>

export type UserUpdatePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserDeletePageMutationVariables = Exact<{
  pageId: Scalars['String']
}>

export type UserDeletePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserCreatePageMutationVariables = Exact<{
  input: UserCreatePageInput
}>

export type UserCreatePageMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type PlanDetailsFragment = {
  __typename?: 'Plan'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  name?: string | null
  description?: string | null
  currency?: string | null
  priceMonth?: number | null
  priceYear?: number | null
  available?: boolean | null
  recommended?: boolean | null
  features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
}

export type AdminGetPlanQueryVariables = Exact<{
  planId: Scalars['String']
}>

export type AdminGetPlanQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  } | null
}

export type AdminGetPlansQueryVariables = Exact<{
  input?: InputMaybe<AdminGetPlansInput>
}>

export type AdminGetPlansQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  }> | null
}

export type AdminCreatePlanMutationVariables = Exact<{
  input: AdminCreatePlanInput
}>

export type AdminCreatePlanMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  } | null
}

export type AdminUpdatePlanMutationVariables = Exact<{
  planId: Scalars['String']
  input: AdminUpdatePlanInput
}>

export type AdminUpdatePlanMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  } | null
}

export type AdminDeletePlanMutationVariables = Exact<{
  planId: Scalars['String']
}>

export type AdminDeletePlanMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  } | null
}

export type AnonGetPlansQueryVariables = Exact<{ [key: string]: never }>

export type AnonGetPlansQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Plan'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    description?: string | null
    currency?: string | null
    priceMonth?: number | null
    priceYear?: number | null
    available?: boolean | null
    recommended?: boolean | null
    features?: Array<{ __typename?: 'PlanFeature'; id?: string | null; name?: string | null }> | null
  }> | null
}

export type ProfileDetailsFragment = {
  __typename?: 'Profile'
  id?: string | null
  createdAt?: any | null
  updatedAt?: any | null
  name?: string | null
  username?: string | null
  bio?: string | null
  avatarUrl?: string | null
  metaUrl?: string | null
  color?: string | null
  followers?: number | null
  following?: number | null
  type?: ProfileType | null
  gumProfile?: {
    __typename?: 'Account'
    id?: string | null
    name?: string | null
    type?: AccountType | null
    address?: string | null
    network?: NetworkType | null
    explorerUrl?: string | null
  } | null
  gumProfileMeta?: {
    __typename?: 'Account'
    id?: string | null
    name?: string | null
    type?: AccountType | null
    address?: string | null
    network?: NetworkType | null
    explorerUrl?: string | null
  } | null
}

export type AdminGetProfileQueryVariables = Exact<{
  profileId: Scalars['String']
}>

export type AdminGetProfileQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminGetProfilesQueryVariables = Exact<{
  input?: InputMaybe<AdminGetProfilesInput>
}>

export type AdminGetProfilesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      status?: PageStatus | null
      type?: PageType | null
      siteUrl?: string | null
      viewUrl?: string | null
      domains?: Array<{
        __typename?: 'PageDomain'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        path?: string | null
        viewUrl?: string | null
        domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
        page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
      }> | null
    } | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  }> | null
}

export type AdminUpdateProfileMutationVariables = Exact<{
  profileId: Scalars['String']
  input: AdminUpdateProfileInput
}>

export type AdminUpdateProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminDeleteProfileMutationVariables = Exact<{
  profileId: Scalars['String']
}>

export type AdminDeleteProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserLinkProfileIdentityMutationVariables = Exact<{
  profileId: Scalars['String']
  identityId: Scalars['String']
}>

export type UserLinkProfileIdentityMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserUnlinkProfileIdentityMutationVariables = Exact<{
  profileId: Scalars['String']
  identityId: Scalars['String']
}>

export type UserUnlinkProfileIdentityMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserGetProfileQueryVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserGetProfileQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserGetProfilePageQueryVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserGetProfilePageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  } | null
}

export type UserGetProfilesQueryVariables = Exact<{ [key: string]: never }>

export type UserGetProfilesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    page?: {
      __typename?: 'Page'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      status?: PageStatus | null
      type?: PageType | null
      siteUrl?: string | null
      viewUrl?: string | null
      domains?: Array<{
        __typename?: 'PageDomain'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        path?: string | null
        viewUrl?: string | null
        domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
        page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
      }> | null
    } | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  }> | null
}

export type UserUpdateProfileMutationVariables = Exact<{
  profileId: Scalars['String']
  input: UserUpdateProfileInput
}>

export type UserUpdateProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserDeleteProfileMutationVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserDeleteProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserSyncProfileMutationVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserSyncProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserVerifyProfileMutationVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserVerifyProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserSetDefaultProfileMutationVariables = Exact<{
  profileId: Scalars['String']
}>

export type UserSetDefaultProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserCreateProfileMutationVariables = Exact<{
  type: ProfileType
}>

export type UserCreateProfileMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type QueueDetailsFragment = {
  __typename?: 'Queue'
  type: QueueType
  name: string
  info?: any | null
  isPaused?: boolean | null
  count?: {
    __typename?: 'QueueCount'
    active?: number | null
    completed?: number | null
    delayed?: number | null
    failed?: number | null
    paused?: number | null
    waiting?: number | null
  } | null
}

export type QueueCountDetailsFragment = {
  __typename?: 'QueueCount'
  active?: number | null
  completed?: number | null
  delayed?: number | null
  failed?: number | null
  paused?: number | null
  waiting?: number | null
}

export type JobDetailsFragment = {
  __typename?: 'Job'
  id?: string | null
  data?: any | null
  opts?: any | null
  attemptsMade?: number | null
  processedOn?: number | null
  finishedOn?: number | null
  timestamp?: number | null
  name?: string | null
  stacktrace?: Array<string> | null
  returnvalue?: any | null
  failedReason?: string | null
}

export type AdminGetQueuesQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetQueuesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  }> | null
}

export type AdminGetQueueQueryVariables = Exact<{
  type: QueueType
}>

export type AdminGetQueueQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  } | null
}

export type AdminGetQueueJobsQueryVariables = Exact<{
  type: QueueType
  statuses: Array<JobStatus> | JobStatus
}>

export type AdminGetQueueJobsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Job'
    id?: string | null
    data?: any | null
    opts?: any | null
    attemptsMade?: number | null
    processedOn?: number | null
    finishedOn?: number | null
    timestamp?: number | null
    name?: string | null
    stacktrace?: Array<string> | null
    returnvalue?: any | null
    failedReason?: string | null
  }> | null
}

export type AdminCleanQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminCleanQueueMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminDeleteQueueJobMutationVariables = Exact<{
  type: QueueType
  jobId: Scalars['String']
}>

export type AdminDeleteQueueJobMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminPauseQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminPauseQueueMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminResumeQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminResumeQueueMutation = { __typename?: 'Mutation'; resumed?: boolean | null }

export type UserSearchMutationVariables = Exact<{
  input: UserSearchInput
}>

export type UserSearchMutation = {
  __typename?: 'Mutation'
  result?: {
    __typename?: 'SearchResult'
    accounts?: Array<{
      __typename?: 'Account'
      id?: string | null
      createdAt?: any | null
      explorerUrl?: string | null
      name?: string | null
      network?: NetworkType | null
      type?: AccountType | null
      program?: string | null
      updatedAt?: any | null
      metadata?: any | null
      address?: string | null
      discoveredAt?: any | null
      identity?: {
        __typename?: 'Identity'
        id?: string | null
        provider?: IdentityProvider | null
        providerId: string
        profile?: any | null
        verified: boolean
        createdAt?: any | null
        updatedAt?: any | null
        owner?: {
          __typename?: 'User'
          id?: string | null
          pid?: number | null
          role?: UserRole | null
          status?: UserStatus | null
          createdAt?: any | null
          updatedAt?: any | null
          followersCount?: number | null
          followingCount?: number | null
          profileUrl?: string | null
          publicKey?: string | null
          username?: string | null
          relation?: {
            __typename?: 'UserRelation'
            isYou: boolean
            isFollowedByYou: boolean
            isFollowingYou: boolean
          } | null
          profile?: {
            __typename?: 'Profile'
            id?: string | null
            createdAt?: any | null
            updatedAt?: any | null
            name?: string | null
            username?: string | null
            bio?: string | null
            avatarUrl?: string | null
            metaUrl?: string | null
            color?: string | null
            followers?: number | null
            following?: number | null
            type?: ProfileType | null
            gumProfile?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
            gumProfileMeta?: {
              __typename?: 'Account'
              id?: string | null
              name?: string | null
              type?: AccountType | null
              address?: string | null
              network?: NetworkType | null
              explorerUrl?: string | null
            } | null
          } | null
          gumUser?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
      } | null
      discoveredBy?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        role?: UserRole | null
        status?: UserStatus | null
        createdAt?: any | null
        updatedAt?: any | null
        followersCount?: number | null
        followingCount?: number | null
        profileUrl?: string | null
        publicKey?: string | null
        username?: string | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
        profile?: {
          __typename?: 'Profile'
          id?: string | null
          createdAt?: any | null
          updatedAt?: any | null
          name?: string | null
          username?: string | null
          bio?: string | null
          avatarUrl?: string | null
          metaUrl?: string | null
          color?: string | null
          followers?: number | null
          following?: number | null
          type?: ProfileType | null
          gumProfile?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
          gumProfileMeta?: {
            __typename?: 'Account'
            id?: string | null
            name?: string | null
            type?: AccountType | null
            address?: string | null
            network?: NetworkType | null
            explorerUrl?: string | null
          } | null
        } | null
        gumUser?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
    }> | null
    users?: Array<{
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
  } | null
}

export type UserRelationDetailsFragment = {
  __typename?: 'UserRelation'
  isYou: boolean
  isFollowedByYou: boolean
  isFollowingYou: boolean
}

export type UserDetailsFragment = {
  __typename?: 'User'
  id?: string | null
  pid?: number | null
  role?: UserRole | null
  status?: UserStatus | null
  createdAt?: any | null
  updatedAt?: any | null
  followersCount?: number | null
  followingCount?: number | null
  profileUrl?: string | null
  publicKey?: string | null
  username?: string | null
  relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  profile?: {
    __typename?: 'Profile'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    name?: string | null
    username?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    color?: string | null
    followers?: number | null
    following?: number | null
    type?: ProfileType | null
    gumProfile?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
    gumProfileMeta?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
  gumUser?: {
    __typename?: 'Account'
    id?: string | null
    name?: string | null
    type?: AccountType | null
    address?: string | null
    network?: NetworkType | null
    explorerUrl?: string | null
  } | null
}

export type AdminGetUserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminGetUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    profiles?: Array<{
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminGetUsersQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetUsersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  }> | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminDeleteUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AnonGetUserQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AnonGetUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    profiles?: Array<{
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type AnonGetUserFollowersQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AnonGetUserFollowersQuery = {
  __typename?: 'Query'
  item?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  }> | null
}

export type AnonGetUserFollowingQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AnonGetUserFollowingQuery = {
  __typename?: 'Query'
  item?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      provider?: IdentityProvider | null
      providerId: string
      profile?: any | null
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  }> | null
}

export type AnonGetUserPagesQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AnonGetUserPagesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Page'
    id?: string | null
    createdAt?: any | null
    updatedAt?: any | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      role?: UserRole | null
      status?: UserStatus | null
      createdAt?: any | null
      updatedAt?: any | null
      followersCount?: number | null
      followingCount?: number | null
      profileUrl?: string | null
      publicKey?: string | null
      username?: string | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
      profile?: {
        __typename?: 'Profile'
        id?: string | null
        createdAt?: any | null
        updatedAt?: any | null
        name?: string | null
        username?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        color?: string | null
        followers?: number | null
        following?: number | null
        type?: ProfileType | null
        gumProfile?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
        gumProfileMeta?: {
          __typename?: 'Account'
          id?: string | null
          name?: string | null
          type?: AccountType | null
          address?: string | null
          network?: NetworkType | null
          explorerUrl?: string | null
        } | null
      } | null
      gumUser?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
  }> | null
}

export type AnonGetUserProfilesQueryVariables = Exact<{
  username: Scalars['String']
}>

export type AnonGetUserProfilesQuery = { __typename?: 'Query'; item?: any | null }

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserFollowUserMutationVariables = Exact<{
  username: Scalars['String']
}>

export type UserFollowUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserUnfollowUserMutationVariables = Exact<{
  username: Scalars['String']
}>

export type UserUnfollowUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export type UserVerifyUserMutationVariables = Exact<{ [key: string]: never }>

export type UserVerifyUserMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    role?: UserRole | null
    status?: UserStatus | null
    createdAt?: any | null
    updatedAt?: any | null
    followersCount?: number | null
    followingCount?: number | null
    profileUrl?: string | null
    publicKey?: string | null
    username?: string | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
    profile?: {
      __typename?: 'Profile'
      id?: string | null
      createdAt?: any | null
      updatedAt?: any | null
      name?: string | null
      username?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      color?: string | null
      followers?: number | null
      following?: number | null
      type?: ProfileType | null
      gumProfile?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
      gumProfileMeta?: {
        __typename?: 'Account'
        id?: string | null
        name?: string | null
        type?: AccountType | null
        address?: string | null
        network?: NetworkType | null
        explorerUrl?: string | null
      } | null
    } | null
    gumUser?: {
      __typename?: 'Account'
      id?: string | null
      name?: string | null
      type?: AccountType | null
      address?: string | null
      network?: NetworkType | null
      explorerUrl?: string | null
    } | null
  } | null
}

export const UserRelationDetailsFragmentDoc = gql`
  fragment UserRelationDetails on UserRelation {
    isYou
    isFollowedByYou
    isFollowingYou
  }
`
export const AccountSummaryFragmentDoc = gql`
  fragment AccountSummary on Account {
    id
    name
    type
    address
    network
    explorerUrl
  }
`
export const ProfileDetailsFragmentDoc = gql`
  fragment ProfileDetails on Profile {
    id
    createdAt
    updatedAt
    name
    username
    bio
    avatarUrl
    metaUrl
    color
    followers
    following
    type
    gumProfile {
      ...AccountSummary
    }
    gumProfileMeta {
      ...AccountSummary
    }
  }
  ${AccountSummaryFragmentDoc}
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    pid
    role
    status
    createdAt
    updatedAt
    followersCount
    followingCount
    profileUrl
    publicKey
    username
    relation {
      ...UserRelationDetails
    }
    profile {
      ...ProfileDetails
    }
    gumUser {
      ...AccountSummary
    }
  }
  ${UserRelationDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
  ${AccountSummaryFragmentDoc}
`
export const AccountDetailsFragmentDoc = gql`
  fragment AccountDetails on Account {
    id
    updatedAt
    createdAt
    name
    program
    metadata
    network
    type
    address
    explorerUrl
    discoveredAt
    discoveredBy {
      ...UserDetails
    }
    identity {
      id
      provider
      providerId
      profile
      verified
      owner {
        ...UserDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AuthChallengeRequestDetailsFragmentDoc = gql`
  fragment AuthChallengeRequestDetails on AuthChallengeRequest {
    challenge
    expiresAt
  }
`
export const ConfigApiDetailsFragmentDoc = gql`
  fragment ConfigApiDetails on ConfigApi {
    name
    url
    version
  }
`
export const ConfigAppDetailsFragmentDoc = gql`
  fragment ConfigAppDetails on ConfigApp {
    url
  }
`
export const ClusterDetailsFragmentDoc = gql`
  fragment ClusterDetails on Cluster {
    id
    name
    type
    endpoint
    explorerUrl
  }
`
export const ConfigDetailsFragmentDoc = gql`
  fragment ConfigDetails on Config {
    api {
      ...ConfigApiDetails
    }
    app {
      ...ConfigAppDetails
    }
    cluster {
      ...ClusterDetails
    }
    clusters {
      ...ClusterDetails
    }
  }
  ${ConfigApiDetailsFragmentDoc}
  ${ConfigAppDetailsFragmentDoc}
  ${ClusterDetailsFragmentDoc}
`
export const SettingDetailFragmentDoc = gql`
  fragment SettingDetail on Setting {
    id
    createdAt
    updatedAt
    default
    description
    key
    value
  }
`
export const DomainDetailsFragmentDoc = gql`
  fragment DomainDetails on Domain {
    id
    createdAt
    updatedAt
    name
    order
    premium
    private
    secure
    owner {
      id
      username
      profile {
        id
        name
        username
        avatarUrl
        bio
      }
    }
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    id
    createdAt
    updatedAt
    provider
    providerId
    profile
    verified
  }
`
export const InviteDetailsFragmentDoc = gql`
  fragment InviteDetails on Invite {
    id
    createdAt
    updatedAt
    expiresAt
    code
    maxUses
    useCount
    inviteUrl
    isExpired
    isUsedUp
    owner {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const PageBlockDetailsFragmentDoc = gql`
  fragment PageBlockDetails on PageBlock {
    id
    createdAt
    updatedAt
    type
    data
    order
  }
`
export const PageDomainDetailsFragmentDoc = gql`
  fragment PageDomainDetails on PageDomain {
    id
    createdAt
    updatedAt
    domain {
      id
      name
    }
    page {
      id
      title
    }
    path
    viewUrl
  }
`
export const PageSummaryFragmentDoc = gql`
  fragment PageSummary on Page {
    id
    createdAt
    updatedAt
    status
    type
    siteUrl
    viewUrl
    domains {
      ...PageDomainDetails
    }
  }
  ${PageDomainDetailsFragmentDoc}
`
export const PageDetailsFragmentDoc = gql`
  fragment PageDetails on Page {
    id
    createdAt
    updatedAt
    status
    type
    title
    description
    color
    owner {
      ...UserDetails
    }
    siteUrl
    viewUrl
  }
  ${UserDetailsFragmentDoc}
`
export const PlanDetailsFragmentDoc = gql`
  fragment PlanDetails on Plan {
    id
    createdAt
    updatedAt
    name
    description
    currency
    priceMonth
    priceYear
    available
    recommended
    features {
      id
      name
    }
  }
`
export const QueueCountDetailsFragmentDoc = gql`
  fragment QueueCountDetails on QueueCount {
    active
    completed
    delayed
    failed
    paused
    waiting
  }
`
export const QueueDetailsFragmentDoc = gql`
  fragment QueueDetails on Queue {
    type
    name
    count {
      ...QueueCountDetails
    }
    info
    isPaused
  }
  ${QueueCountDetailsFragmentDoc}
`
export const JobDetailsFragmentDoc = gql`
  fragment JobDetails on Job {
    id
    data
    opts
    attemptsMade
    processedOn
    finishedOn
    timestamp
    name
    stacktrace
    returnvalue
    failedReason
  }
`
export const AdminIndexGumAccountsDocument = gql`
  mutation AdminIndexGumAccounts {
    item: adminIndexGumAccounts
  }
`

export function useAdminIndexGumAccountsMutation() {
  return Urql.useMutation<AdminIndexGumAccountsMutation, AdminIndexGumAccountsMutationVariables>(
    AdminIndexGumAccountsDocument,
  )
}
export const AdminDeleteAccountDocument = gql`
  mutation AdminDeleteAccount($accountId: String!) {
    item: adminDeleteAccount(accountId: $accountId)
  }
`

export function useAdminDeleteAccountMutation() {
  return Urql.useMutation<AdminDeleteAccountMutation, AdminDeleteAccountMutationVariables>(AdminDeleteAccountDocument)
}
export const AdminGetAccountsDocument = gql`
  query AdminGetAccounts($input: AdminGetAccountsInput!) {
    items: adminGetAccounts(input: $input) {
      ...AccountDetails
      owner {
        ...AccountDetails
      }
    }
  }
  ${AccountDetailsFragmentDoc}
`

export function useAdminGetAccountsQuery(options: Omit<Urql.UseQueryArgs<AdminGetAccountsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetAccountsQuery, AdminGetAccountsQueryVariables>({
    query: AdminGetAccountsDocument,
    ...options,
  })
}
export const AdminGetAccountDocument = gql`
  query AdminGetAccount($accountId: String!) {
    item: adminGetAccount(accountId: $accountId) {
      ...AccountDetails
      owner {
        ...AccountDetails
      }
      tokens {
        ...AccountDetails
      }
      gumProfile {
        ...ProfileDetails
        owner {
          ...UserDetails
          gumUser {
            ...AccountSummary
          }
        }
        gumProfile {
          ...AccountSummary
        }
        gumProfileMeta {
          ...AccountSummary
        }
      }
      gumProfileMeta {
        ...ProfileDetails
      }
      gumUser {
        ...UserDetails
      }
    }
  }
  ${AccountDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${AccountSummaryFragmentDoc}
`

export function useAdminGetAccountQuery(options: Omit<Urql.UseQueryArgs<AdminGetAccountQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetAccountQuery, AdminGetAccountQueryVariables>({
    query: AdminGetAccountDocument,
    ...options,
  })
}
export const UserGetAccountDocument = gql`
  query UserGetAccount($network: NetworkType!, $address: String!) {
    item: userGetAccount(network: $network, address: $address) {
      ...AccountDetails
      owner {
        ...AccountSummary
      }
      tokens {
        ...AccountSummary
      }
      gumProfile {
        ...ProfileDetails
        owner {
          ...UserDetails
          gumUser {
            ...AccountSummary
          }
        }
        gumProfile {
          ...AccountSummary
        }
        gumProfileMeta {
          ...AccountSummary
        }
      }
      gumProfileMeta {
        ...ProfileDetails
      }
      gumUser {
        ...UserDetails
      }
    }
  }
  ${AccountDetailsFragmentDoc}
  ${AccountSummaryFragmentDoc}
  ${ProfileDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useUserGetAccountQuery(options: Omit<Urql.UseQueryArgs<UserGetAccountQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetAccountQuery, UserGetAccountQueryVariables>({ query: UserGetAccountDocument, ...options })
}
export const UserGetAccountHistoryDocument = gql`
  query UserGetAccountHistory($network: NetworkType!, $address: String!) {
    items: userGetAccountHistory(network: $network, address: $address)
  }
`

export function useUserGetAccountHistoryQuery(
  options: Omit<Urql.UseQueryArgs<UserGetAccountHistoryQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserGetAccountHistoryQuery, UserGetAccountHistoryQueryVariables>({
    query: UserGetAccountHistoryDocument,
    ...options,
  })
}
export const GetMeDocument = gql`
  query GetMe {
    me: getMe {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
      profile {
        ...ProfileDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useGetMeQuery(options?: Omit<Urql.UseQueryArgs<GetMeQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMeQuery, GetMeQueryVariables>({ query: GetMeDocument, ...options })
}
export const AnonRequestChallengeDocument = gql`
  query AnonRequestChallenge($publicKey: String!) {
    result: anonRequestChallenge(publicKey: $publicKey) {
      ...AuthChallengeRequestDetails
    }
  }
  ${AuthChallengeRequestDetailsFragmentDoc}
`

export function useAnonRequestChallengeQuery(
  options: Omit<Urql.UseQueryArgs<AnonRequestChallengeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AnonRequestChallengeQuery, AnonRequestChallengeQueryVariables>({
    query: AnonRequestChallengeDocument,
    ...options,
  })
}
export const UserLogoutDocument = gql`
  mutation UserLogout {
    userLogout
  }
`

export function useUserLogoutMutation() {
  return Urql.useMutation<UserLogoutMutation, UserLogoutMutationVariables>(UserLogoutDocument)
}
export const AnonRespondChallengeDocument = gql`
  mutation AnonRespondChallenge($challenge: String!, $publicKey: String!, $signature: String!) {
    result: anonRespondChallenge(challenge: $challenge, publicKey: $publicKey, signature: $signature) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAnonRespondChallengeMutation() {
  return Urql.useMutation<AnonRespondChallengeMutation, AnonRespondChallengeMutationVariables>(
    AnonRespondChallengeDocument,
  )
}
export const ConfigDocument = gql`
  query Config {
    config {
      ...ConfigDetails
    }
  }
  ${ConfigDetailsFragmentDoc}
`

export function useConfigQuery(options?: Omit<Urql.UseQueryArgs<ConfigQueryVariables>, 'query'>) {
  return Urql.useQuery<ConfigQuery, ConfigQueryVariables>({ query: ConfigDocument, ...options })
}
export const UptimeDocument = gql`
  query Uptime {
    uptime
  }
`

export function useUptimeQuery(options?: Omit<Urql.UseQueryArgs<UptimeQueryVariables>, 'query'>) {
  return Urql.useQuery<UptimeQuery, UptimeQueryVariables>({ query: UptimeDocument, ...options })
}
export const AdminGetSettingsDocument = gql`
  query AdminGetSettings {
    items: adminGetSettings {
      ...SettingDetail
    }
  }
  ${SettingDetailFragmentDoc}
`

export function useAdminGetSettingsQuery(options?: Omit<Urql.UseQueryArgs<AdminGetSettingsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetSettingsQuery, AdminGetSettingsQueryVariables>({
    query: AdminGetSettingsDocument,
    ...options,
  })
}
export const AdminSetSettingDocument = gql`
  mutation AdminSetSetting($key: String!, $value: String!) {
    item: adminSetSetting(key: $key, value: $value) {
      ...SettingDetail
    }
  }
  ${SettingDetailFragmentDoc}
`

export function useAdminSetSettingMutation() {
  return Urql.useMutation<AdminSetSettingMutation, AdminSetSettingMutationVariables>(AdminSetSettingDocument)
}
export const AdminGetDomainDocument = gql`
  query AdminGetDomain($domainId: String!) {
    item: adminGetDomain(domainId: $domainId) {
      ...DomainDetails
      pages {
        ...PageDetails
      }
    }
  }
  ${DomainDetailsFragmentDoc}
  ${PageDetailsFragmentDoc}
`

export function useAdminGetDomainQuery(options: Omit<Urql.UseQueryArgs<AdminGetDomainQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetDomainQuery, AdminGetDomainQueryVariables>({ query: AdminGetDomainDocument, ...options })
}
export const AdminGetDomainsDocument = gql`
  query AdminGetDomains($input: AdminGetDomainsInput) {
    items: adminGetDomains(input: $input) {
      ...DomainDetails
    }
  }
  ${DomainDetailsFragmentDoc}
`

export function useAdminGetDomainsQuery(options?: Omit<Urql.UseQueryArgs<AdminGetDomainsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetDomainsQuery, AdminGetDomainsQueryVariables>({
    query: AdminGetDomainsDocument,
    ...options,
  })
}
export const AdminCreateDomainDocument = gql`
  mutation AdminCreateDomain($input: AdminCreateDomainInput!) {
    item: adminCreateDomain(input: $input) {
      ...DomainDetails
    }
  }
  ${DomainDetailsFragmentDoc}
`

export function useAdminCreateDomainMutation() {
  return Urql.useMutation<AdminCreateDomainMutation, AdminCreateDomainMutationVariables>(AdminCreateDomainDocument)
}
export const AdminUpdateDomainDocument = gql`
  mutation AdminUpdateDomain($domainId: String!, $input: AdminUpdateDomainInput!) {
    item: adminUpdateDomain(domainId: $domainId, input: $input) {
      ...DomainDetails
    }
  }
  ${DomainDetailsFragmentDoc}
`

export function useAdminUpdateDomainMutation() {
  return Urql.useMutation<AdminUpdateDomainMutation, AdminUpdateDomainMutationVariables>(AdminUpdateDomainDocument)
}
export const AdminDeleteDomainDocument = gql`
  mutation AdminDeleteDomain($domainId: String!) {
    item: adminDeleteDomain(domainId: $domainId) {
      ...DomainDetails
    }
  }
  ${DomainDetailsFragmentDoc}
`

export function useAdminDeleteDomainMutation() {
  return Urql.useMutation<AdminDeleteDomainMutation, AdminDeleteDomainMutationVariables>(AdminDeleteDomainDocument)
}
export const UserDeleteIdentityDocument = gql`
  mutation UserDeleteIdentity($identityId: String!) {
    item: userDeleteIdentity(identityId: $identityId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserDeleteIdentityMutation() {
  return Urql.useMutation<UserDeleteIdentityMutation, UserDeleteIdentityMutationVariables>(UserDeleteIdentityDocument)
}
export const UserGetIdentitiesDocument = gql`
  query UserGetIdentities {
    items: userGetIdentities {
      ...IdentityDetails
      accounts {
        ...AccountDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${AccountDetailsFragmentDoc}
`

export function useUserGetIdentitiesQuery(options?: Omit<Urql.UseQueryArgs<UserGetIdentitiesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetIdentitiesQuery, UserGetIdentitiesQueryVariables>({
    query: UserGetIdentitiesDocument,
    ...options,
  })
}
export const UserGetIdentityDocument = gql`
  query UserGetIdentity($identityId: String!) {
    item: userGetIdentity(identityId: $identityId) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`

export function useUserGetIdentityQuery(options: Omit<Urql.UseQueryArgs<UserGetIdentityQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetIdentityQuery, UserGetIdentityQueryVariables>({
    query: UserGetIdentityDocument,
    ...options,
  })
}
export const UserLinkIdentityDocument = gql`
  mutation UserLinkIdentity($provider: IdentityProvider!, $providerId: String!) {
    item: userLinkIdentity(provider: $provider, providerId: $providerId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserLinkIdentityMutation() {
  return Urql.useMutation<UserLinkIdentityMutation, UserLinkIdentityMutationVariables>(UserLinkIdentityDocument)
}
export const UserSyncIdentityDocument = gql`
  mutation UserSyncIdentity($identityId: String!) {
    item: userSyncIdentity(identityId: $identityId) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`

export function useUserSyncIdentityMutation() {
  return Urql.useMutation<UserSyncIdentityMutation, UserSyncIdentityMutationVariables>(UserSyncIdentityDocument)
}
export const AdminGetInviteDocument = gql`
  query AdminGetInvite($inviteId: String!) {
    item: adminGetInvite(inviteId: $inviteId) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAdminGetInviteQuery(options: Omit<Urql.UseQueryArgs<AdminGetInviteQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetInviteQuery, AdminGetInviteQueryVariables>({ query: AdminGetInviteDocument, ...options })
}
export const AdminGetInvitesDocument = gql`
  query AdminGetInvites($input: AdminGetInvitesInput) {
    items: adminGetInvites(input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useAdminGetInvitesQuery(options?: Omit<Urql.UseQueryArgs<AdminGetInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetInvitesQuery, AdminGetInvitesQueryVariables>({
    query: AdminGetInvitesDocument,
    ...options,
  })
}
export const AdminCreateInviteDocument = gql`
  mutation AdminCreateInvite($input: AdminCreateInviteInput!) {
    item: adminCreateInvite(input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useAdminCreateInviteMutation() {
  return Urql.useMutation<AdminCreateInviteMutation, AdminCreateInviteMutationVariables>(AdminCreateInviteDocument)
}
export const AdminUpdateInviteDocument = gql`
  mutation AdminUpdateInvite($inviteId: String!, $input: AdminUpdateInviteInput!) {
    item: adminUpdateInvite(inviteId: $inviteId, input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useAdminUpdateInviteMutation() {
  return Urql.useMutation<AdminUpdateInviteMutation, AdminUpdateInviteMutationVariables>(AdminUpdateInviteDocument)
}
export const AdminDeleteInviteDocument = gql`
  mutation AdminDeleteInvite($inviteId: String!) {
    item: adminDeleteInvite(inviteId: $inviteId) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useAdminDeleteInviteMutation() {
  return Urql.useMutation<AdminDeleteInviteMutation, AdminDeleteInviteMutationVariables>(AdminDeleteInviteDocument)
}
export const AnonGetInviteDocument = gql`
  query AnonGetInvite($code: String!) {
    item: anonGetInvite(code: $code) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAnonGetInviteQuery(options: Omit<Urql.UseQueryArgs<AnonGetInviteQueryVariables>, 'query'>) {
  return Urql.useQuery<AnonGetInviteQuery, AnonGetInviteQueryVariables>({ query: AnonGetInviteDocument, ...options })
}
export const UserGetInvitesDocument = gql`
  query UserGetInvites {
    items: userGetInvites {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useUserGetInvitesQuery(options?: Omit<Urql.UseQueryArgs<UserGetInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetInvitesQuery, UserGetInvitesQueryVariables>({ query: UserGetInvitesDocument, ...options })
}
export const UserGetInviteDocument = gql`
  query UserGetInvite {
    item: userGetInvite {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useUserGetInviteQuery(options?: Omit<Urql.UseQueryArgs<UserGetInviteQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetInviteQuery, UserGetInviteQueryVariables>({ query: UserGetInviteDocument, ...options })
}
export const UserAcceptInviteDocument = gql`
  mutation UserAcceptInvite($code: String!) {
    item: userAcceptInvite(code: $code) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useUserAcceptInviteMutation() {
  return Urql.useMutation<UserAcceptInviteMutation, UserAcceptInviteMutationVariables>(UserAcceptInviteDocument)
}
export const AdminAddPageBlockDocument = gql`
  mutation AdminAddPageBlock($pageId: String!, $input: AdminAddPageBlockInput!) {
    item: adminAddPageBlock(pageId: $pageId, input: $input) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useAdminAddPageBlockMutation() {
  return Urql.useMutation<AdminAddPageBlockMutation, AdminAddPageBlockMutationVariables>(AdminAddPageBlockDocument)
}
export const AdminRemovePageBlockDocument = gql`
  mutation AdminRemovePageBlock($pageId: String!, $pageBlockId: String!) {
    item: adminRemovePageBlock(pageId: $pageId, pageBlockId: $pageBlockId) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useAdminRemovePageBlockMutation() {
  return Urql.useMutation<AdminRemovePageBlockMutation, AdminRemovePageBlockMutationVariables>(
    AdminRemovePageBlockDocument,
  )
}
export const AdminUpdatePageBlockDocument = gql`
  mutation AdminUpdatePageBlock($pageId: String!, $pageBlockId: String!, $input: AdminUpdatePageBlockInput!) {
    item: adminUpdatePageBlock(pageId: $pageId, pageBlockId: $pageBlockId, input: $input) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useAdminUpdatePageBlockMutation() {
  return Urql.useMutation<AdminUpdatePageBlockMutation, AdminUpdatePageBlockMutationVariables>(
    AdminUpdatePageBlockDocument,
  )
}
export const UserAddPageBlockDocument = gql`
  mutation UserAddPageBlock($pageId: String!, $input: UserAddPageBlockInput!) {
    item: userAddPageBlock(pageId: $pageId, input: $input) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useUserAddPageBlockMutation() {
  return Urql.useMutation<UserAddPageBlockMutation, UserAddPageBlockMutationVariables>(UserAddPageBlockDocument)
}
export const UserRemovePageBlockDocument = gql`
  mutation UserRemovePageBlock($pageId: String!, $pageBlockId: String!) {
    item: userRemovePageBlock(pageId: $pageId, pageBlockId: $pageBlockId) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useUserRemovePageBlockMutation() {
  return Urql.useMutation<UserRemovePageBlockMutation, UserRemovePageBlockMutationVariables>(
    UserRemovePageBlockDocument,
  )
}
export const UserUpdatePageBlockDocument = gql`
  mutation UserUpdatePageBlock($pageId: String!, $pageBlockId: String!, $input: UserUpdatePageBlockInput!) {
    item: userUpdatePageBlock(pageId: $pageId, pageBlockId: $pageBlockId, input: $input) {
      ...PageBlockDetails
      page {
        id
        blocks {
          id
        }
      }
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useUserUpdatePageBlockMutation() {
  return Urql.useMutation<UserUpdatePageBlockMutation, UserUpdatePageBlockMutationVariables>(
    UserUpdatePageBlockDocument,
  )
}
export const AdminGetPageDomainDocument = gql`
  query AdminGetPageDomain($domainId: String!, $path: String!) {
    item: adminGetPageDomain(domainId: $domainId, path: $path) {
      ...PageDomainDetails
      page {
        id
        domains {
          id
        }
      }
    }
  }
  ${PageDomainDetailsFragmentDoc}
`

export function useAdminGetPageDomainQuery(
  options: Omit<Urql.UseQueryArgs<AdminGetPageDomainQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AdminGetPageDomainQuery, AdminGetPageDomainQueryVariables>({
    query: AdminGetPageDomainDocument,
    ...options,
  })
}
export const AdminAddPageDomainDocument = gql`
  mutation AdminAddPageDomain($pageId: String!, $input: AdminAddPageDomainInput!) {
    item: adminAddPageDomain(pageId: $pageId, input: $input) {
      ...PageDomainDetails
      page {
        id
        domains {
          id
        }
      }
    }
  }
  ${PageDomainDetailsFragmentDoc}
`

export function useAdminAddPageDomainMutation() {
  return Urql.useMutation<AdminAddPageDomainMutation, AdminAddPageDomainMutationVariables>(AdminAddPageDomainDocument)
}
export const AdminRemovePageDomainDocument = gql`
  mutation AdminRemovePageDomain($pageId: String!, $pageDomainId: String!) {
    item: adminRemovePageDomain(pageId: $pageId, pageDomainId: $pageDomainId) {
      ...PageDomainDetails
      page {
        id
        domains {
          id
        }
      }
    }
  }
  ${PageDomainDetailsFragmentDoc}
`

export function useAdminRemovePageDomainMutation() {
  return Urql.useMutation<AdminRemovePageDomainMutation, AdminRemovePageDomainMutationVariables>(
    AdminRemovePageDomainDocument,
  )
}
export const AdminGetPageDocument = gql`
  query AdminGetPage($pageId: String!) {
    item: adminGetPage(pageId: $pageId) {
      ...PageDetails
      blocks {
        ...PageBlockDetails
      }
      domains {
        ...PageDomainDetails
      }
      profile {
        id
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageBlockDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
`

export function useAdminGetPageQuery(options: Omit<Urql.UseQueryArgs<AdminGetPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetPageQuery, AdminGetPageQueryVariables>({ query: AdminGetPageDocument, ...options })
}
export const AdminGetPagesDocument = gql`
  query AdminGetPages($input: AdminGetPagesInput) {
    items: adminGetPages(input: $input) {
      ...PageDetails
      domains {
        ...PageDomainDetails
      }
      profile {
        ...ProfileDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useAdminGetPagesQuery(options?: Omit<Urql.UseQueryArgs<AdminGetPagesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetPagesQuery, AdminGetPagesQueryVariables>({ query: AdminGetPagesDocument, ...options })
}
export const AdminCreatePageDocument = gql`
  mutation AdminCreatePage($input: AdminCreatePageInput!) {
    item: adminCreatePage(input: $input) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useAdminCreatePageMutation() {
  return Urql.useMutation<AdminCreatePageMutation, AdminCreatePageMutationVariables>(AdminCreatePageDocument)
}
export const AdminUpdatePageDocument = gql`
  mutation AdminUpdatePage($pageId: String!, $input: AdminUpdatePageInput!) {
    item: adminUpdatePage(pageId: $pageId, input: $input) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useAdminUpdatePageMutation() {
  return Urql.useMutation<AdminUpdatePageMutation, AdminUpdatePageMutationVariables>(AdminUpdatePageDocument)
}
export const AdminDeletePageDocument = gql`
  mutation AdminDeletePage($pageId: String!) {
    item: adminDeletePage(pageId: $pageId) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useAdminDeletePageMutation() {
  return Urql.useMutation<AdminDeletePageMutation, AdminDeletePageMutationVariables>(AdminDeletePageDocument)
}
export const AnonGetPageDocument = gql`
  query AnonGetPage($pageId: String!) {
    item: anonGetPage(pageId: $pageId) {
      ...PageDetails
      blocks {
        ...PageBlockDetails
      }
      domains {
        ...PageDomainDetails
      }
      profile {
        ...ProfileDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageBlockDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useAnonGetPageQuery(options: Omit<Urql.UseQueryArgs<AnonGetPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AnonGetPageQuery, AnonGetPageQueryVariables>({ query: AnonGetPageDocument, ...options })
}
export const UserGetPageDocument = gql`
  query UserGetPage($pageId: String!) {
    item: userGetPage(pageId: $pageId) {
      ...PageDetails
      blocks {
        ...PageBlockDetails
      }
      domains {
        ...PageDomainDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageBlockDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
`

export function useUserGetPageQuery(options: Omit<Urql.UseQueryArgs<UserGetPageQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetPageQuery, UserGetPageQueryVariables>({ query: UserGetPageDocument, ...options })
}
export const UserUpdatePageDocument = gql`
  mutation UserUpdatePage($pageId: String!, $input: UserUpdatePageInput!) {
    item: userUpdatePage(pageId: $pageId, input: $input) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useUserUpdatePageMutation() {
  return Urql.useMutation<UserUpdatePageMutation, UserUpdatePageMutationVariables>(UserUpdatePageDocument)
}
export const UserDeletePageDocument = gql`
  mutation UserDeletePage($pageId: String!) {
    item: userDeletePage(pageId: $pageId) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useUserDeletePageMutation() {
  return Urql.useMutation<UserDeletePageMutation, UserDeletePageMutationVariables>(UserDeletePageDocument)
}
export const UserCreatePageDocument = gql`
  mutation UserCreatePage($input: UserCreatePageInput!) {
    item: userCreatePage(input: $input) {
      ...PageDetails
    }
  }
  ${PageDetailsFragmentDoc}
`

export function useUserCreatePageMutation() {
  return Urql.useMutation<UserCreatePageMutation, UserCreatePageMutationVariables>(UserCreatePageDocument)
}
export const AdminGetPlanDocument = gql`
  query AdminGetPlan($planId: String!) {
    item: adminGetPlan(planId: $planId) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminGetPlanQuery(options: Omit<Urql.UseQueryArgs<AdminGetPlanQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetPlanQuery, AdminGetPlanQueryVariables>({ query: AdminGetPlanDocument, ...options })
}
export const AdminGetPlansDocument = gql`
  query AdminGetPlans($input: AdminGetPlansInput) {
    items: adminGetPlans(input: $input) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminGetPlansQuery(options?: Omit<Urql.UseQueryArgs<AdminGetPlansQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetPlansQuery, AdminGetPlansQueryVariables>({ query: AdminGetPlansDocument, ...options })
}
export const AdminCreatePlanDocument = gql`
  mutation AdminCreatePlan($input: AdminCreatePlanInput!) {
    item: adminCreatePlan(input: $input) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminCreatePlanMutation() {
  return Urql.useMutation<AdminCreatePlanMutation, AdminCreatePlanMutationVariables>(AdminCreatePlanDocument)
}
export const AdminUpdatePlanDocument = gql`
  mutation AdminUpdatePlan($planId: String!, $input: AdminUpdatePlanInput!) {
    item: adminUpdatePlan(planId: $planId, input: $input) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminUpdatePlanMutation() {
  return Urql.useMutation<AdminUpdatePlanMutation, AdminUpdatePlanMutationVariables>(AdminUpdatePlanDocument)
}
export const AdminDeletePlanDocument = gql`
  mutation AdminDeletePlan($planId: String!) {
    item: adminDeletePlan(planId: $planId) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminDeletePlanMutation() {
  return Urql.useMutation<AdminDeletePlanMutation, AdminDeletePlanMutationVariables>(AdminDeletePlanDocument)
}
export const AnonGetPlansDocument = gql`
  query AnonGetPlans {
    items: anonGetPlans {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAnonGetPlansQuery(options?: Omit<Urql.UseQueryArgs<AnonGetPlansQueryVariables>, 'query'>) {
  return Urql.useQuery<AnonGetPlansQuery, AnonGetPlansQueryVariables>({ query: AnonGetPlansDocument, ...options })
}
export const AdminGetProfileDocument = gql`
  query AdminGetProfile($profileId: String!) {
    item: adminGetProfile(profileId: $profileId) {
      ...ProfileDetails
      owner {
        ...UserDetails
      }
    }
  }
  ${ProfileDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAdminGetProfileQuery(options: Omit<Urql.UseQueryArgs<AdminGetProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetProfileQuery, AdminGetProfileQueryVariables>({
    query: AdminGetProfileDocument,
    ...options,
  })
}
export const AdminGetProfilesDocument = gql`
  query AdminGetProfiles($input: AdminGetProfilesInput) {
    items: adminGetProfiles(input: $input) {
      ...ProfileDetails
      owner {
        ...UserDetails
      }
      page {
        ...PageSummary
      }
    }
  }
  ${ProfileDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${PageSummaryFragmentDoc}
`

export function useAdminGetProfilesQuery(options?: Omit<Urql.UseQueryArgs<AdminGetProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetProfilesQuery, AdminGetProfilesQueryVariables>({
    query: AdminGetProfilesDocument,
    ...options,
  })
}
export const AdminUpdateProfileDocument = gql`
  mutation AdminUpdateProfile($profileId: String!, $input: AdminUpdateProfileInput!) {
    item: adminUpdateProfile(profileId: $profileId, input: $input) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useAdminUpdateProfileMutation() {
  return Urql.useMutation<AdminUpdateProfileMutation, AdminUpdateProfileMutationVariables>(AdminUpdateProfileDocument)
}
export const AdminDeleteProfileDocument = gql`
  mutation AdminDeleteProfile($profileId: String!) {
    item: adminDeleteProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useAdminDeleteProfileMutation() {
  return Urql.useMutation<AdminDeleteProfileMutation, AdminDeleteProfileMutationVariables>(AdminDeleteProfileDocument)
}
export const UserLinkProfileIdentityDocument = gql`
  mutation UserLinkProfileIdentity($profileId: String!, $identityId: String!) {
    item: userLinkProfileIdentity(profileId: $profileId, identityId: $identityId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserLinkProfileIdentityMutation() {
  return Urql.useMutation<UserLinkProfileIdentityMutation, UserLinkProfileIdentityMutationVariables>(
    UserLinkProfileIdentityDocument,
  )
}
export const UserUnlinkProfileIdentityDocument = gql`
  mutation UserUnlinkProfileIdentity($profileId: String!, $identityId: String!) {
    item: userUnlinkProfileIdentity(profileId: $profileId, identityId: $identityId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserUnlinkProfileIdentityMutation() {
  return Urql.useMutation<UserUnlinkProfileIdentityMutation, UserUnlinkProfileIdentityMutationVariables>(
    UserUnlinkProfileIdentityDocument,
  )
}
export const UserGetProfileDocument = gql`
  query UserGetProfile($profileId: String!) {
    item: userGetProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserGetProfileQuery(options: Omit<Urql.UseQueryArgs<UserGetProfileQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetProfileQuery, UserGetProfileQueryVariables>({ query: UserGetProfileDocument, ...options })
}
export const UserGetProfilePageDocument = gql`
  query UserGetProfilePage($profileId: String!) {
    item: userGetProfilePage(profileId: $profileId) {
      ...PageDetails
      blocks {
        ...PageBlockDetails
      }
      domains {
        ...PageDomainDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageBlockDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
`

export function useUserGetProfilePageQuery(
  options: Omit<Urql.UseQueryArgs<UserGetProfilePageQueryVariables>, 'query'>,
) {
  return Urql.useQuery<UserGetProfilePageQuery, UserGetProfilePageQueryVariables>({
    query: UserGetProfilePageDocument,
    ...options,
  })
}
export const UserGetProfilesDocument = gql`
  query UserGetProfiles {
    items: userGetProfiles {
      ...ProfileDetails
      owner {
        ...UserDetails
        profile {
          ...ProfileDetails
        }
      }
      page {
        ...PageSummary
      }
      identities {
        ...IdentityDetails
      }
    }
  }
  ${ProfileDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${PageSummaryFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useUserGetProfilesQuery(options?: Omit<Urql.UseQueryArgs<UserGetProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserGetProfilesQuery, UserGetProfilesQueryVariables>({
    query: UserGetProfilesDocument,
    ...options,
  })
}
export const UserUpdateProfileDocument = gql`
  mutation UserUpdateProfile($profileId: String!, $input: UserUpdateProfileInput!) {
    item: userUpdateProfile(profileId: $profileId, input: $input) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserUpdateProfileMutation() {
  return Urql.useMutation<UserUpdateProfileMutation, UserUpdateProfileMutationVariables>(UserUpdateProfileDocument)
}
export const UserDeleteProfileDocument = gql`
  mutation UserDeleteProfile($profileId: String!) {
    item: userDeleteProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserDeleteProfileMutation() {
  return Urql.useMutation<UserDeleteProfileMutation, UserDeleteProfileMutationVariables>(UserDeleteProfileDocument)
}
export const UserSyncProfileDocument = gql`
  mutation UserSyncProfile($profileId: String!) {
    item: userSyncProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserSyncProfileMutation() {
  return Urql.useMutation<UserSyncProfileMutation, UserSyncProfileMutationVariables>(UserSyncProfileDocument)
}
export const UserVerifyProfileDocument = gql`
  mutation UserVerifyProfile($profileId: String!) {
    item: userVerifyProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserVerifyProfileMutation() {
  return Urql.useMutation<UserVerifyProfileMutation, UserVerifyProfileMutationVariables>(UserVerifyProfileDocument)
}
export const UserSetDefaultProfileDocument = gql`
  mutation UserSetDefaultProfile($profileId: String!) {
    item: userSetDefaultProfile(profileId: $profileId) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserSetDefaultProfileMutation() {
  return Urql.useMutation<UserSetDefaultProfileMutation, UserSetDefaultProfileMutationVariables>(
    UserSetDefaultProfileDocument,
  )
}
export const UserCreateProfileDocument = gql`
  mutation UserCreateProfile($type: ProfileType!) {
    item: userCreateProfile(type: $type) {
      ...ProfileDetails
    }
  }
  ${ProfileDetailsFragmentDoc}
`

export function useUserCreateProfileMutation() {
  return Urql.useMutation<UserCreateProfileMutation, UserCreateProfileMutationVariables>(UserCreateProfileDocument)
}
export const AdminGetQueuesDocument = gql`
  query AdminGetQueues {
    items: adminGetQueues {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useAdminGetQueuesQuery(options?: Omit<Urql.UseQueryArgs<AdminGetQueuesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetQueuesQuery, AdminGetQueuesQueryVariables>({ query: AdminGetQueuesDocument, ...options })
}
export const AdminGetQueueDocument = gql`
  query AdminGetQueue($type: QueueType!) {
    item: adminGetQueue(type: $type) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useAdminGetQueueQuery(options: Omit<Urql.UseQueryArgs<AdminGetQueueQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetQueueQuery, AdminGetQueueQueryVariables>({ query: AdminGetQueueDocument, ...options })
}
export const AdminGetQueueJobsDocument = gql`
  query AdminGetQueueJobs($type: QueueType!, $statuses: [JobStatus!]!) {
    items: adminGetQueueJobs(type: $type, statuses: $statuses) {
      ...JobDetails
    }
  }
  ${JobDetailsFragmentDoc}
`

export function useAdminGetQueueJobsQuery(options: Omit<Urql.UseQueryArgs<AdminGetQueueJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetQueueJobsQuery, AdminGetQueueJobsQueryVariables>({
    query: AdminGetQueueJobsDocument,
    ...options,
  })
}
export const AdminCleanQueueDocument = gql`
  mutation AdminCleanQueue($type: QueueType!) {
    paused: adminCleanQueue(type: $type)
  }
`

export function useAdminCleanQueueMutation() {
  return Urql.useMutation<AdminCleanQueueMutation, AdminCleanQueueMutationVariables>(AdminCleanQueueDocument)
}
export const AdminDeleteQueueJobDocument = gql`
  mutation AdminDeleteQueueJob($type: QueueType!, $jobId: String!) {
    paused: adminDeleteQueueJob(type: $type, jobId: $jobId)
  }
`

export function useAdminDeleteQueueJobMutation() {
  return Urql.useMutation<AdminDeleteQueueJobMutation, AdminDeleteQueueJobMutationVariables>(
    AdminDeleteQueueJobDocument,
  )
}
export const AdminPauseQueueDocument = gql`
  mutation AdminPauseQueue($type: QueueType!) {
    paused: adminPauseQueue(type: $type)
  }
`

export function useAdminPauseQueueMutation() {
  return Urql.useMutation<AdminPauseQueueMutation, AdminPauseQueueMutationVariables>(AdminPauseQueueDocument)
}
export const AdminResumeQueueDocument = gql`
  mutation AdminResumeQueue($type: QueueType!) {
    resumed: adminResumeQueue(type: $type)
  }
`

export function useAdminResumeQueueMutation() {
  return Urql.useMutation<AdminResumeQueueMutation, AdminResumeQueueMutationVariables>(AdminResumeQueueDocument)
}
export const UserSearchDocument = gql`
  mutation UserSearch($input: UserSearchInput!) {
    result: userSearch(input: $input) {
      accounts {
        ...AccountDetails
        id
        createdAt
        explorerUrl
        identity {
          ...IdentityDetails
        }
        name
        network
        type
        program
      }
      users {
        ...UserDetails
      }
    }
  }
  ${AccountDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useUserSearchMutation() {
  return Urql.useMutation<UserSearchMutation, UserSearchMutationVariables>(UserSearchDocument)
}
export const AdminGetUserDocument = gql`
  query AdminGetUser($userId: String!) {
    item: adminGetUser(userId: $userId) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
      profiles {
        ...ProfileDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useAdminGetUserQuery(options: Omit<Urql.UseQueryArgs<AdminGetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetUserQuery, AdminGetUserQueryVariables>({ query: AdminGetUserDocument, ...options })
}
export const AdminGetUsersDocument = gql`
  query AdminGetUsers {
    items: adminGetUsers {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminGetUsersQuery(options?: Omit<Urql.UseQueryArgs<AdminGetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminGetUsersQuery, AdminGetUsersQueryVariables>({ query: AdminGetUsersDocument, ...options })
}
export const AdminCreateUserDocument = gql`
  mutation AdminCreateUser($input: AdminCreateUserInput!) {
    item: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminCreateUserMutation() {
  return Urql.useMutation<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument)
}
export const AdminUpdateUserDocument = gql`
  mutation AdminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    item: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminUpdateUserMutation() {
  return Urql.useMutation<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>(AdminUpdateUserDocument)
}
export const AdminDeleteUserDocument = gql`
  mutation AdminDeleteUser($userId: String!) {
    item: adminDeleteUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminDeleteUserMutation() {
  return Urql.useMutation<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>(AdminDeleteUserDocument)
}
export const AnonGetUserDocument = gql`
  query AnonGetUser($username: String!) {
    item: anonGetUser(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
      profile {
        ...ProfileDetails
      }
      profiles {
        ...ProfileDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useAnonGetUserQuery(options: Omit<Urql.UseQueryArgs<AnonGetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AnonGetUserQuery, AnonGetUserQueryVariables>({ query: AnonGetUserDocument, ...options })
}
export const AnonGetUserFollowersDocument = gql`
  query AnonGetUserFollowers($username: String!) {
    item: anonGetUserFollowers(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useAnonGetUserFollowersQuery(
  options: Omit<Urql.UseQueryArgs<AnonGetUserFollowersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AnonGetUserFollowersQuery, AnonGetUserFollowersQueryVariables>({
    query: AnonGetUserFollowersDocument,
    ...options,
  })
}
export const AnonGetUserFollowingDocument = gql`
  query AnonGetUserFollowing($username: String!) {
    item: anonGetUserFollowing(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useAnonGetUserFollowingQuery(
  options: Omit<Urql.UseQueryArgs<AnonGetUserFollowingQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AnonGetUserFollowingQuery, AnonGetUserFollowingQueryVariables>({
    query: AnonGetUserFollowingDocument,
    ...options,
  })
}
export const AnonGetUserPagesDocument = gql`
  query AnonGetUserPages($username: String!) {
    items: anonGetUserPages(username: $username) {
      ...PageDetails
      profile {
        ...ProfileDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${ProfileDetailsFragmentDoc}
`

export function useAnonGetUserPagesQuery(options: Omit<Urql.UseQueryArgs<AnonGetUserPagesQueryVariables>, 'query'>) {
  return Urql.useQuery<AnonGetUserPagesQuery, AnonGetUserPagesQueryVariables>({
    query: AnonGetUserPagesDocument,
    ...options,
  })
}
export const AnonGetUserProfilesDocument = gql`
  query AnonGetUserProfiles($username: String!) {
    item: anonGetUserProfiles(username: $username)
  }
`

export function useAnonGetUserProfilesQuery(
  options: Omit<Urql.UseQueryArgs<AnonGetUserProfilesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<AnonGetUserProfilesQuery, AnonGetUserProfilesQueryVariables>({
    query: AnonGetUserProfilesDocument,
    ...options,
  })
}
export const UserUpdateUserDocument = gql`
  mutation UserUpdateUser($input: UserUpdateUserInput!) {
    item: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserUpdateUserMutation() {
  return Urql.useMutation<UserUpdateUserMutation, UserUpdateUserMutationVariables>(UserUpdateUserDocument)
}
export const UserFollowUserDocument = gql`
  mutation UserFollowUser($username: String!) {
    item: userFollowUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserFollowUserMutation() {
  return Urql.useMutation<UserFollowUserMutation, UserFollowUserMutationVariables>(UserFollowUserDocument)
}
export const UserUnfollowUserDocument = gql`
  mutation UserUnfollowUser($username: String!) {
    item: userUnfollowUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserUnfollowUserMutation() {
  return Urql.useMutation<UserUnfollowUserMutation, UserUnfollowUserMutationVariables>(UserUnfollowUserDocument)
}
export const UserVerifyUserDocument = gql`
  mutation UserVerifyUser {
    item: userVerifyUser {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserVerifyUserMutation() {
  return Urql.useMutation<UserVerifyUserMutation, UserVerifyUserMutationVariables>(UserVerifyUserDocument)
}
