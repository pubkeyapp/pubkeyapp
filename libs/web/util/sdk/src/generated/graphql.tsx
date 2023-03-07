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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
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

export type AdminListDomainInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminListInviteInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminListPageInput = {
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminListPlanInput = {
  id?: InputMaybe<Scalars['String']>
}

export type AdminUpdateDomainInput = {
  order?: InputMaybe<Scalars['Int']>
  premium?: InputMaybe<Scalars['Boolean']>
  private?: InputMaybe<Scalars['Boolean']>
  secure?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateInviteInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']>
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

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  bio?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
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
  createdAt?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  owner?: Maybe<User>
  pages?: Maybe<Array<Page>>
  premium?: Maybe<Scalars['Boolean']>
  private?: Maybe<Scalars['Boolean']>
  secure?: Maybe<Scalars['Boolean']>
  updatedAt?: Maybe<Scalars['String']>
}

export type Follow = {
  __typename?: 'Follow'
  createdAt?: Maybe<Scalars['String']>
  follower?: Maybe<User>
  followerId?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  ownerId?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type Identity = {
  __typename?: 'Identity'
  createdAt?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  provider?: Maybe<IdentityProvider>
  providerId: Scalars['String']
  updatedAt?: Maybe<Scalars['String']>
  verified: Scalars['Boolean']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type Invite = {
  __typename?: 'Invite'
  code?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  expiresAt?: Maybe<Scalars['DateTime']>
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
  adminCreateDomain?: Maybe<Domain>
  adminCreateInvite?: Maybe<Invite>
  adminCreatePage?: Maybe<Page>
  adminCreatePlan?: Maybe<Plan>
  adminCreateUser?: Maybe<User>
  adminDeleteDomain?: Maybe<Domain>
  adminDeleteInvite?: Maybe<Invite>
  adminDeletePage?: Maybe<Page>
  adminDeletePlan?: Maybe<Plan>
  adminDeleteUser?: Maybe<User>
  adminRemovePageBlock?: Maybe<PageBlock>
  adminRemovePageDomain?: Maybe<PageDomain>
  adminUpdateDomain?: Maybe<Domain>
  adminUpdateInvite?: Maybe<Invite>
  adminUpdatePage?: Maybe<Page>
  adminUpdatePageBlock?: Maybe<PageBlock>
  adminUpdatePlan?: Maybe<Plan>
  adminUpdateUser?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']>
  queueClean?: Maybe<Scalars['Boolean']>
  queueDeleteJob?: Maybe<Scalars['Boolean']>
  queueLoad?: Maybe<Queue>
  queuePause?: Maybe<Scalars['Boolean']>
  queueResume?: Maybe<Scalars['Boolean']>
  respondChallenge?: Maybe<User>
  userAddPageBlock?: Maybe<PageBlock>
  userCreatePage?: Maybe<Page>
  userDeletePage?: Maybe<Page>
  userFollow?: Maybe<User>
  userRemovePageBlock?: Maybe<PageBlock>
  userUnfollow?: Maybe<User>
  userUpdatePage?: Maybe<Page>
  userUpdatePageBlock?: Maybe<PageBlock>
}

export type MutationAdminAddPageBlockArgs = {
  input: AdminAddPageBlockInput
  pageId: Scalars['String']
}

export type MutationAdminAddPageDomainArgs = {
  input: AdminAddPageDomainInput
  pageId: Scalars['String']
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

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminRemovePageBlockArgs = {
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationAdminRemovePageDomainArgs = {
  pageDomainId: Scalars['String']
  pageId: Scalars['String']
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

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']
}

export type MutationQueueCleanArgs = {
  type: QueueType
}

export type MutationQueueDeleteJobArgs = {
  jobId: Scalars['String']
  type: QueueType
}

export type MutationQueueLoadArgs = {
  input: QueueLoadInput
}

export type MutationQueuePauseArgs = {
  type: QueueType
}

export type MutationQueueResumeArgs = {
  type: QueueType
}

export type MutationRespondChallengeArgs = {
  challenge: Scalars['String']
  publicKey: Scalars['String']
  signature: Scalars['String']
}

export type MutationUserAddPageBlockArgs = {
  input: UserAddPageBlockInput
  pageId: Scalars['String']
}

export type MutationUserCreatePageArgs = {
  input: UserCreatePageInput
}

export type MutationUserDeletePageArgs = {
  pageId: Scalars['String']
}

export type MutationUserFollowArgs = {
  username: Scalars['String']
}

export type MutationUserRemovePageBlockArgs = {
  pageBlockId: Scalars['String']
  pageId: Scalars['String']
}

export type MutationUserUnfollowArgs = {
  username: Scalars['String']
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

export type Page = {
  __typename?: 'Page'
  blocks?: Maybe<Array<PageBlock>>
  color?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  domains?: Maybe<Array<PageDomain>>
  id?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  previewUrl?: Maybe<Scalars['String']>
  siteUrl?: Maybe<Scalars['String']>
  status?: Maybe<PageStatus>
  title?: Maybe<Scalars['String']>
  type?: Maybe<PageType>
  updatedAt?: Maybe<Scalars['String']>
  urls?: Maybe<Array<Scalars['String']>>
  viewUrl?: Maybe<Scalars['String']>
}

export type PageBlock = {
  __typename?: 'PageBlock'
  createdAt?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['JSON']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  page?: Maybe<Page>
  type?: Maybe<PageBlockType>
  updatedAt?: Maybe<Scalars['String']>
}

export enum PageBlockType {
  Header = 'Header',
  Link = 'Link',
}

export type PageDomain = {
  __typename?: 'PageDomain'
  createdAt?: Maybe<Scalars['String']>
  domain?: Maybe<Domain>
  id?: Maybe<Scalars['String']>
  page?: Maybe<Page>
  path?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
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

export type Query = {
  __typename?: 'Query'
  adminDomain?: Maybe<Domain>
  adminDomains?: Maybe<Array<Domain>>
  adminInvite?: Maybe<Invite>
  adminInvites?: Maybe<Array<Invite>>
  adminPage?: Maybe<Page>
  adminPageBlock?: Maybe<PageBlock>
  adminPageDomain?: Maybe<PageDomain>
  adminPages?: Maybe<Array<Page>>
  adminPlan?: Maybe<Plan>
  adminPlans?: Maybe<Array<Plan>>
  adminUser?: Maybe<User>
  adminUsers?: Maybe<Array<User>>
  config?: Maybe<Config>
  me?: Maybe<User>
  publicInvite?: Maybe<Invite>
  publicPage?: Maybe<Page>
  publicPlans?: Maybe<Array<Plan>>
  queue?: Maybe<Queue>
  queueJobs?: Maybe<Array<Job>>
  queues?: Maybe<Array<Queue>>
  requestChallenge?: Maybe<AuthChallengeRequest>
  uptime: Scalars['Float']
  user?: Maybe<User>
  userFollowers?: Maybe<Array<User>>
  userFollowing?: Maybe<Array<User>>
  userInvites?: Maybe<Array<Invite>>
  userPage?: Maybe<Page>
  userPageBlock?: Maybe<PageBlock>
  userPages?: Maybe<Array<Page>>
  userProfiles?: Maybe<Scalars['JSON']>
}

export type QueryAdminDomainArgs = {
  domainId: Scalars['String']
}

export type QueryAdminDomainsArgs = {
  input?: InputMaybe<AdminListDomainInput>
}

export type QueryAdminInviteArgs = {
  inviteId: Scalars['String']
}

export type QueryAdminInvitesArgs = {
  input?: InputMaybe<AdminListInviteInput>
}

export type QueryAdminPageArgs = {
  pageId: Scalars['String']
}

export type QueryAdminPageBlockArgs = {
  pageBlockId: Scalars['String']
}

export type QueryAdminPageDomainArgs = {
  domainId: Scalars['String']
  path: Scalars['String']
}

export type QueryAdminPagesArgs = {
  input?: InputMaybe<AdminListPageInput>
}

export type QueryAdminPlanArgs = {
  planId: Scalars['String']
}

export type QueryAdminPlansArgs = {
  input?: InputMaybe<AdminListPlanInput>
}

export type QueryAdminUserArgs = {
  userId: Scalars['String']
}

export type QueryPublicInviteArgs = {
  code: Scalars['String']
}

export type QueryPublicPageArgs = {
  pageId: Scalars['String']
}

export type QueryQueueArgs = {
  type: QueueType
}

export type QueryQueueJobsArgs = {
  statuses: Array<JobStatus>
  type: QueueType
}

export type QueryRequestChallengeArgs = {
  publicKey: Scalars['String']
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export type QueryUserFollowersArgs = {
  username: Scalars['String']
}

export type QueryUserFollowingArgs = {
  username: Scalars['String']
}

export type QueryUserInvitesArgs = {
  username: Scalars['String']
}

export type QueryUserPageArgs = {
  pageId: Scalars['String']
}

export type QueryUserPageBlockArgs = {
  pageBlockId: Scalars['String']
}

export type QueryUserProfilesArgs = {
  username: Scalars['String']
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

export type QueueLoadInput = {
  payload: Scalars['JSON']
  serverAppId: Scalars['String']
  type: QueueType
}

export enum QueueType {
  CloseAccount = 'CloseAccount',
  ParseBlock = 'ParseBlock',
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']>
  bio?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['String']>
  followers?: Maybe<Array<Follow>>
  followersCount?: Maybe<Scalars['Int']>
  following?: Maybe<Array<Follow>>
  followingCount?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['String']>
  identities?: Maybe<Array<Identity>>
  metaUrl?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  pid?: Maybe<Scalars['Int']>
  profileUrl?: Maybe<Scalars['String']>
  publicKey?: Maybe<Scalars['String']>
  relation?: Maybe<UserRelation>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type UserAddPageBlockInput = {
  data?: InputMaybe<Scalars['JSON']>
  order?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<PageBlockType>
}

export type UserCreatePageInput = {
  color?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  ownerId?: InputMaybe<Scalars['String']>
  title: Scalars['String']
  type?: InputMaybe<PageType>
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

export type AuthChallengeRequestDetailsFragment = {
  __typename?: 'AuthChallengeRequest'
  challenge: string
  expiresAt: string
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type RequestChallengeQueryVariables = Exact<{
  publicKey: Scalars['String']
}>

export type RequestChallengeQuery = {
  __typename?: 'Query'
  result?: { __typename?: 'AuthChallengeRequest'; challenge: string; expiresAt: string } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RespondChallengeMutationVariables = Exact<{
  challenge: Scalars['String']
  publicKey: Scalars['String']
  signature: Scalars['String']
}>

export type RespondChallengeMutation = {
  __typename?: 'Mutation'
  result?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
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

export type DomainDetailsFragment = {
  __typename?: 'Domain'
  id?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  name?: string | null
  order?: number | null
  premium?: boolean | null
  private?: boolean | null
  secure?: boolean | null
  owner?: {
    __typename?: 'User'
    id?: string | null
    username?: string | null
    name?: string | null
    avatarUrl?: string | null
  } | null
}

export type AdminDomainQueryVariables = Exact<{
  domainId: Scalars['String']
}>

export type AdminDomainQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Domain'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    pages?: Array<{
      __typename?: 'Page'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      status?: PageStatus | null
      type?: PageType | null
      title?: string | null
      description?: string | null
      color?: string | null
      previewUrl?: string | null
      siteUrl?: string | null
      viewUrl?: string | null
      owner?: {
        __typename?: 'User'
        id?: string | null
        pid?: number | null
        createdAt?: string | null
        updatedAt?: string | null
        role?: UserRole | null
        status?: UserStatus | null
        username?: string | null
        name?: string | null
        bio?: string | null
        avatarUrl?: string | null
        metaUrl?: string | null
        profileUrl?: string | null
        publicKey?: string | null
        followersCount?: number | null
        followingCount?: number | null
        relation?: {
          __typename?: 'UserRelation'
          isYou: boolean
          isFollowedByYou: boolean
          isFollowingYou: boolean
        } | null
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  } | null
}

export type AdminDomainsQueryVariables = Exact<{
  input?: InputMaybe<AdminListDomainInput>
}>

export type AdminDomainsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Domain'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
    name?: string | null
    order?: number | null
    premium?: boolean | null
    private?: boolean | null
    secure?: boolean | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  } | null
}

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  id?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  provider?: IdentityProvider | null
  providerId: string
  verified: boolean
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
    username?: string | null
    name?: string | null
    avatarUrl?: string | null
  } | null
}

export type AdminInviteQueryVariables = Exact<{
  inviteId: Scalars['String']
}>

export type AdminInviteQuery = {
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
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  } | null
}

export type AdminInvitesQueryVariables = Exact<{
  input?: InputMaybe<AdminListInviteInput>
}>

export type AdminInvitesQuery = {
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
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
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
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  } | null
}

export type PublicInviteQueryVariables = Exact<{
  code: Scalars['String']
}>

export type PublicInviteQuery = {
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
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  } | null
}

export type PageBlockDetailsFragment = {
  __typename?: 'PageBlock'
  id?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  type?: PageBlockType | null
  data?: any | null
  order?: number | null
}

export type AdminPageBlockQueryVariables = Exact<{
  pageBlockId: Scalars['String']
}>

export type AdminPageBlockQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'PageBlock'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    type?: PageBlockType | null
    data?: any | null
    order?: number | null
  } | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
  createdAt?: string | null
  updatedAt?: string | null
  path?: string | null
  viewUrl?: string | null
  domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
  page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
}

export type AdminPageDomainQueryVariables = Exact<{
  domainId: Scalars['String']
  path: Scalars['String']
}>

export type AdminPageDomainQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'PageDomain'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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
    createdAt?: string | null
    updatedAt?: string | null
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

export type PageDetailsFragment = {
  __typename?: 'Page'
  id?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  status?: PageStatus | null
  type?: PageType | null
  title?: string | null
  description?: string | null
  color?: string | null
  previewUrl?: string | null
  siteUrl?: string | null
  viewUrl?: string | null
  owner?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type AdminPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type AdminPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    } | null
  } | null
}

export type AdminPagesQueryVariables = Exact<{
  input?: InputMaybe<AdminListPageInput>
}>

export type AdminPagesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Page'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    } | null
  } | null
}

export type PublicPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type PublicPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    } | null
  } | null
}

export type UserPageQueryVariables = Exact<{
  pageId: Scalars['String']
}>

export type UserPageQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Page'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    blocks?: Array<{
      __typename?: 'PageBlock'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      type?: PageBlockType | null
      data?: any | null
      order?: number | null
    }> | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    } | null
  } | null
}

export type UserPagesQueryVariables = Exact<{ [key: string]: never }>

export type UserPagesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Page'
    id?: string | null
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    domains?: Array<{
      __typename?: 'PageDomain'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      path?: string | null
      viewUrl?: string | null
      domain?: { __typename?: 'Domain'; id?: string | null; name?: string | null } | null
      page?: { __typename?: 'Page'; id?: string | null; title?: string | null } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    } | null
  }> | null
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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
    createdAt?: string | null
    updatedAt?: string | null
    status?: PageStatus | null
    type?: PageType | null
    title?: string | null
    description?: string | null
    color?: string | null
    previewUrl?: string | null
    siteUrl?: string | null
    viewUrl?: string | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      pid?: number | null
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
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

export type AdminPlanQueryVariables = Exact<{
  planId: Scalars['String']
}>

export type AdminPlanQuery = {
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

export type AdminPlansQueryVariables = Exact<{
  input?: InputMaybe<AdminListPlanInput>
}>

export type AdminPlansQuery = {
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

export type PublicPlansQueryVariables = Exact<{ [key: string]: never }>

export type PublicPlansQuery = {
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

export type QueuesQueryVariables = Exact<{ [key: string]: never }>

export type QueuesQuery = {
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

export type QueueQueryVariables = Exact<{
  type: QueueType
}>

export type QueueQuery = {
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

export type QueueJobsQueryVariables = Exact<{
  type: QueueType
  statuses: Array<JobStatus> | JobStatus
}>

export type QueueJobsQuery = {
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

export type QueueLoadMutationVariables = Exact<{
  input: QueueLoadInput
}>

export type QueueLoadMutation = {
  __typename?: 'Mutation'
  loaded?: {
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

export type QueueCleanMutationVariables = Exact<{
  type: QueueType
}>

export type QueueCleanMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type QueueDeleteJobMutationVariables = Exact<{
  type: QueueType
  jobId: Scalars['String']
}>

export type QueueDeleteJobMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type QueuePauseMutationVariables = Exact<{
  type: QueueType
}>

export type QueuePauseMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type QueueResumeMutationVariables = Exact<{
  type: QueueType
}>

export type QueueResumeMutation = { __typename?: 'Mutation'; resumed?: boolean | null }

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
  createdAt?: string | null
  updatedAt?: string | null
  role?: UserRole | null
  status?: UserStatus | null
  username?: string | null
  name?: string | null
  bio?: string | null
  avatarUrl?: string | null
  metaUrl?: string | null
  profileUrl?: string | null
  publicKey?: string | null
  followersCount?: number | null
  followingCount?: number | null
  relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
}

export type AdminUserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      provider?: IdentityProvider | null
      providerId: string
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type AdminUsersQueryVariables = Exact<{ [key: string]: never }>

export type AdminUsersQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
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
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
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
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
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
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type UserQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      provider?: IdentityProvider | null
      providerId: string
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type UserFollowersQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserFollowersQuery = {
  __typename?: 'Query'
  item?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      provider?: IdentityProvider | null
      providerId: string
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  }> | null
}

export type UserFollowingQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserFollowingQuery = {
  __typename?: 'Query'
  item?: Array<{
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    identities?: Array<{
      __typename?: 'Identity'
      id?: string | null
      createdAt?: string | null
      updatedAt?: string | null
      provider?: IdentityProvider | null
      providerId: string
      verified: boolean
    }> | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  }> | null
}

export type UserInvitesQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserInvitesQuery = {
  __typename?: 'Query'
  item?: Array<{
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
      createdAt?: string | null
      updatedAt?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      username?: string | null
      name?: string | null
      bio?: string | null
      avatarUrl?: string | null
      metaUrl?: string | null
      profileUrl?: string | null
      publicKey?: string | null
      followersCount?: number | null
      followingCount?: number | null
      relation?: {
        __typename?: 'UserRelation'
        isYou: boolean
        isFollowedByYou: boolean
        isFollowingYou: boolean
      } | null
    }> | null
    owner?: {
      __typename?: 'User'
      id?: string | null
      username?: string | null
      name?: string | null
      avatarUrl?: string | null
    } | null
  }> | null
}

export type UserFollowMutationVariables = Exact<{
  username: Scalars['String']
}>

export type UserFollowMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type UserUnfollowMutationVariables = Exact<{
  username: Scalars['String']
}>

export type UserUnfollowMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'User'
    id?: string | null
    pid?: number | null
    createdAt?: string | null
    updatedAt?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    username?: string | null
    name?: string | null
    bio?: string | null
    avatarUrl?: string | null
    metaUrl?: string | null
    profileUrl?: string | null
    publicKey?: string | null
    followersCount?: number | null
    followingCount?: number | null
    relation?: { __typename?: 'UserRelation'; isYou: boolean; isFollowedByYou: boolean; isFollowingYou: boolean } | null
  } | null
}

export type UserProfilesQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserProfilesQuery = { __typename?: 'Query'; item?: any | null }

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
      name
      avatarUrl
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
      id
      username
      name
      avatarUrl
    }
  }
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
export const UserRelationDetailsFragmentDoc = gql`
  fragment UserRelationDetails on UserRelation {
    isYou
    isFollowedByYou
    isFollowingYou
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    id
    pid
    createdAt
    updatedAt
    role
    status
    username
    name
    bio
    avatarUrl
    metaUrl
    profileUrl
    publicKey
    followersCount
    followingCount
    relation {
      ...UserRelationDetails
    }
  }
  ${UserRelationDetailsFragmentDoc}
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
    previewUrl
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
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options })
}
export const RequestChallengeDocument = gql`
  query RequestChallenge($publicKey: String!) {
    result: requestChallenge(publicKey: $publicKey) {
      ...AuthChallengeRequestDetails
    }
  }
  ${AuthChallengeRequestDetailsFragmentDoc}
`

export function useRequestChallengeQuery(options: Omit<Urql.UseQueryArgs<RequestChallengeQueryVariables>, 'query'>) {
  return Urql.useQuery<RequestChallengeQuery, RequestChallengeQueryVariables>({
    query: RequestChallengeDocument,
    ...options,
  })
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument)
}
export const RespondChallengeDocument = gql`
  mutation RespondChallenge($challenge: String!, $publicKey: String!, $signature: String!) {
    result: respondChallenge(challenge: $challenge, publicKey: $publicKey, signature: $signature) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useRespondChallengeMutation() {
  return Urql.useMutation<RespondChallengeMutation, RespondChallengeMutationVariables>(RespondChallengeDocument)
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
export const AdminDomainDocument = gql`
  query AdminDomain($domainId: String!) {
    item: adminDomain(domainId: $domainId) {
      ...DomainDetails
      pages {
        ...PageDetails
      }
    }
  }
  ${DomainDetailsFragmentDoc}
  ${PageDetailsFragmentDoc}
`

export function useAdminDomainQuery(options: Omit<Urql.UseQueryArgs<AdminDomainQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminDomainQuery, AdminDomainQueryVariables>({ query: AdminDomainDocument, ...options })
}
export const AdminDomainsDocument = gql`
  query AdminDomains($input: AdminListDomainInput) {
    items: adminDomains(input: $input) {
      ...DomainDetails
    }
  }
  ${DomainDetailsFragmentDoc}
`

export function useAdminDomainsQuery(options?: Omit<Urql.UseQueryArgs<AdminDomainsQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminDomainsQuery, AdminDomainsQueryVariables>({ query: AdminDomainsDocument, ...options })
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
export const AdminInviteDocument = gql`
  query AdminInvite($inviteId: String!) {
    item: adminInvite(inviteId: $inviteId) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useAdminInviteQuery(options: Omit<Urql.UseQueryArgs<AdminInviteQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminInviteQuery, AdminInviteQueryVariables>({ query: AdminInviteDocument, ...options })
}
export const AdminInvitesDocument = gql`
  query AdminInvites($input: AdminListInviteInput) {
    items: adminInvites(input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`

export function useAdminInvitesQuery(options?: Omit<Urql.UseQueryArgs<AdminInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminInvitesQuery, AdminInvitesQueryVariables>({ query: AdminInvitesDocument, ...options })
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
export const PublicInviteDocument = gql`
  query PublicInvite($code: String!) {
    item: publicInvite(code: $code) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function usePublicInviteQuery(options: Omit<Urql.UseQueryArgs<PublicInviteQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicInviteQuery, PublicInviteQueryVariables>({ query: PublicInviteDocument, ...options })
}
export const AdminPageBlockDocument = gql`
  query AdminPageBlock($pageBlockId: String!) {
    item: adminPageBlock(pageBlockId: $pageBlockId) {
      ...PageBlockDetails
    }
  }
  ${PageBlockDetailsFragmentDoc}
`

export function useAdminPageBlockQuery(options: Omit<Urql.UseQueryArgs<AdminPageBlockQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPageBlockQuery, AdminPageBlockQueryVariables>({ query: AdminPageBlockDocument, ...options })
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
export const AdminPageDomainDocument = gql`
  query AdminPageDomain($domainId: String!, $path: String!) {
    item: adminPageDomain(domainId: $domainId, path: $path) {
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

export function useAdminPageDomainQuery(options: Omit<Urql.UseQueryArgs<AdminPageDomainQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPageDomainQuery, AdminPageDomainQueryVariables>({
    query: AdminPageDomainDocument,
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
export const AdminPageDocument = gql`
  query AdminPage($pageId: String!) {
    item: adminPage(pageId: $pageId) {
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

export function useAdminPageQuery(options: Omit<Urql.UseQueryArgs<AdminPageQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPageQuery, AdminPageQueryVariables>({ query: AdminPageDocument, ...options })
}
export const AdminPagesDocument = gql`
  query AdminPages($input: AdminListPageInput) {
    items: adminPages(input: $input) {
      ...PageDetails
      domains {
        ...PageDomainDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
`

export function useAdminPagesQuery(options?: Omit<Urql.UseQueryArgs<AdminPagesQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPagesQuery, AdminPagesQueryVariables>({ query: AdminPagesDocument, ...options })
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
export const PublicPageDocument = gql`
  query PublicPage($pageId: String!) {
    item: publicPage(pageId: $pageId) {
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

export function usePublicPageQuery(options: Omit<Urql.UseQueryArgs<PublicPageQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicPageQuery, PublicPageQueryVariables>({ query: PublicPageDocument, ...options })
}
export const UserPageDocument = gql`
  query UserPage($pageId: String!) {
    item: userPage(pageId: $pageId) {
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

export function useUserPageQuery(options: Omit<Urql.UseQueryArgs<UserPageQueryVariables>, 'query'>) {
  return Urql.useQuery<UserPageQuery, UserPageQueryVariables>({ query: UserPageDocument, ...options })
}
export const UserPagesDocument = gql`
  query UserPages {
    items: userPages {
      ...PageDetails
      domains {
        ...PageDomainDetails
      }
    }
  }
  ${PageDetailsFragmentDoc}
  ${PageDomainDetailsFragmentDoc}
`

export function useUserPagesQuery(options?: Omit<Urql.UseQueryArgs<UserPagesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserPagesQuery, UserPagesQueryVariables>({ query: UserPagesDocument, ...options })
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
export const AdminPlanDocument = gql`
  query AdminPlan($planId: String!) {
    item: adminPlan(planId: $planId) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminPlanQuery(options: Omit<Urql.UseQueryArgs<AdminPlanQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPlanQuery, AdminPlanQueryVariables>({ query: AdminPlanDocument, ...options })
}
export const AdminPlansDocument = gql`
  query AdminPlans($input: AdminListPlanInput) {
    items: adminPlans(input: $input) {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function useAdminPlansQuery(options?: Omit<Urql.UseQueryArgs<AdminPlansQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminPlansQuery, AdminPlansQueryVariables>({ query: AdminPlansDocument, ...options })
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
export const PublicPlansDocument = gql`
  query PublicPlans {
    items: publicPlans {
      ...PlanDetails
    }
  }
  ${PlanDetailsFragmentDoc}
`

export function usePublicPlansQuery(options?: Omit<Urql.UseQueryArgs<PublicPlansQueryVariables>, 'query'>) {
  return Urql.useQuery<PublicPlansQuery, PublicPlansQueryVariables>({ query: PublicPlansDocument, ...options })
}
export const QueuesDocument = gql`
  query Queues {
    items: queues {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useQueuesQuery(options?: Omit<Urql.UseQueryArgs<QueuesQueryVariables>, 'query'>) {
  return Urql.useQuery<QueuesQuery, QueuesQueryVariables>({ query: QueuesDocument, ...options })
}
export const QueueDocument = gql`
  query Queue($type: QueueType!) {
    item: queue(type: $type) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useQueueQuery(options: Omit<Urql.UseQueryArgs<QueueQueryVariables>, 'query'>) {
  return Urql.useQuery<QueueQuery, QueueQueryVariables>({ query: QueueDocument, ...options })
}
export const QueueJobsDocument = gql`
  query QueueJobs($type: QueueType!, $statuses: [JobStatus!]!) {
    items: queueJobs(type: $type, statuses: $statuses) {
      ...JobDetails
    }
  }
  ${JobDetailsFragmentDoc}
`

export function useQueueJobsQuery(options: Omit<Urql.UseQueryArgs<QueueJobsQueryVariables>, 'query'>) {
  return Urql.useQuery<QueueJobsQuery, QueueJobsQueryVariables>({ query: QueueJobsDocument, ...options })
}
export const QueueLoadDocument = gql`
  mutation QueueLoad($input: QueueLoadInput!) {
    loaded: queueLoad(input: $input) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`

export function useQueueLoadMutation() {
  return Urql.useMutation<QueueLoadMutation, QueueLoadMutationVariables>(QueueLoadDocument)
}
export const QueueCleanDocument = gql`
  mutation QueueClean($type: QueueType!) {
    paused: queueClean(type: $type)
  }
`

export function useQueueCleanMutation() {
  return Urql.useMutation<QueueCleanMutation, QueueCleanMutationVariables>(QueueCleanDocument)
}
export const QueueDeleteJobDocument = gql`
  mutation QueueDeleteJob($type: QueueType!, $jobId: String!) {
    paused: queueDeleteJob(type: $type, jobId: $jobId)
  }
`

export function useQueueDeleteJobMutation() {
  return Urql.useMutation<QueueDeleteJobMutation, QueueDeleteJobMutationVariables>(QueueDeleteJobDocument)
}
export const QueuePauseDocument = gql`
  mutation QueuePause($type: QueueType!) {
    paused: queuePause(type: $type)
  }
`

export function useQueuePauseMutation() {
  return Urql.useMutation<QueuePauseMutation, QueuePauseMutationVariables>(QueuePauseDocument)
}
export const QueueResumeDocument = gql`
  mutation queueResume($type: QueueType!) {
    resumed: queueResume(type: $type)
  }
`

export function useQueueResumeMutation() {
  return Urql.useMutation<QueueResumeMutation, QueueResumeMutationVariables>(QueueResumeDocument)
}
export const AdminUserDocument = gql`
  query AdminUser($userId: String!) {
    item: adminUser(userId: $userId) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useAdminUserQuery(options: Omit<Urql.UseQueryArgs<AdminUserQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUserQuery, AdminUserQueryVariables>({ query: AdminUserDocument, ...options })
}
export const AdminUsersDocument = gql`
  query AdminUsers {
    items: adminUsers {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useAdminUsersQuery(options?: Omit<Urql.UseQueryArgs<AdminUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AdminUsersQuery, AdminUsersQueryVariables>({ query: AdminUsersDocument, ...options })
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
export const UserDocument = gql`
  query User($username: String!) {
    item: user(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options })
}
export const UserFollowersDocument = gql`
  query UserFollowers($username: String!) {
    item: userFollowers(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useUserFollowersQuery(options: Omit<Urql.UseQueryArgs<UserFollowersQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFollowersQuery, UserFollowersQueryVariables>({ query: UserFollowersDocument, ...options })
}
export const UserFollowingDocument = gql`
  query UserFollowing($username: String!) {
    item: userFollowing(username: $username) {
      ...UserDetails
      identities {
        ...IdentityDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
`

export function useUserFollowingQuery(options: Omit<Urql.UseQueryArgs<UserFollowingQueryVariables>, 'query'>) {
  return Urql.useQuery<UserFollowingQuery, UserFollowingQueryVariables>({ query: UserFollowingDocument, ...options })
}
export const UserInvitesDocument = gql`
  query UserInvites($username: String!) {
    item: userInvites(username: $username) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`

export function useUserInvitesQuery(options: Omit<Urql.UseQueryArgs<UserInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserInvitesQuery, UserInvitesQueryVariables>({ query: UserInvitesDocument, ...options })
}
export const UserFollowDocument = gql`
  mutation UserFollow($username: String!) {
    item: userFollow(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserFollowMutation() {
  return Urql.useMutation<UserFollowMutation, UserFollowMutationVariables>(UserFollowDocument)
}
export const UserUnfollowDocument = gql`
  mutation UserUnfollow($username: String!) {
    item: userUnfollow(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export function useUserUnfollowMutation() {
  return Urql.useMutation<UserUnfollowMutation, UserUnfollowMutationVariables>(UserUnfollowDocument)
}
export const UserProfilesDocument = gql`
  query UserProfiles($username: String!) {
    item: userProfiles(username: $username)
  }
`

export function useUserProfilesQuery(options: Omit<Urql.UseQueryArgs<UserProfilesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserProfilesQuery, UserProfilesQueryVariables>({ query: UserProfilesDocument, ...options })
}
