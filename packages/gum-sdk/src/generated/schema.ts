export type Scalars = {
  Boolean: boolean
  Float: number
  Int: number
  String: string
  _int4: any
  bigint: any
  bytea: any
  json: any
  timestamp: any
}

/** ordering argument of a cursor */
export type cursor_ordering = 'ASC' | 'DESC'

/** columns and relationships of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_all {
  account_decoded_data?: Scalars['json']
  account_raw_data?: Scalars['bytea']
  account_type?: Scalars['String']
  executable?: Scalars['Boolean']
  is_bf?: Scalars['Boolean']
  lamports?: Scalars['bigint']
  owner?: Scalars['String']
  pubkey: Scalars['String']
  rent_epoch?: Scalars['bigint']
  slot?: Scalars['bigint']
  updated_on?: Scalars['timestamp']
  write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_all'
}

/** aggregated selection of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_all_aggregate {
  aggregate?: gum_0_1_0_decoded_all_aggregate_fields
  nodes: gum_0_1_0_decoded_all[]
  __typename: 'gum_0_1_0_decoded_all_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_all_aggregate_fields {
  avg?: gum_0_1_0_decoded_all_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_all_max_fields
  min?: gum_0_1_0_decoded_all_min_fields
  stddev?: gum_0_1_0_decoded_all_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_all_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_all_stddev_samp_fields
  sum?: gum_0_1_0_decoded_all_sum_fields
  var_pop?: gum_0_1_0_decoded_all_var_pop_fields
  var_samp?: gum_0_1_0_decoded_all_var_samp_fields
  variance?: gum_0_1_0_decoded_all_variance_fields
  __typename: 'gum_0_1_0_decoded_all_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_all_avg_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_all_max_fields {
  account_type?: Scalars['String']
  lamports?: Scalars['bigint']
  owner?: Scalars['String']
  pubkey?: Scalars['String']
  rent_epoch?: Scalars['bigint']
  slot?: Scalars['bigint']
  updated_on?: Scalars['timestamp']
  write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_all_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_all_min_fields {
  account_type?: Scalars['String']
  lamports?: Scalars['bigint']
  owner?: Scalars['String']
  pubkey?: Scalars['String']
  rent_epoch?: Scalars['bigint']
  slot?: Scalars['bigint']
  updated_on?: Scalars['timestamp']
  write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_all_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.all" */
export type gum_0_1_0_decoded_all_select_column =
  | 'account_decoded_data'
  | 'account_raw_data'
  | 'account_type'
  | 'executable'
  | 'is_bf'
  | 'lamports'
  | 'owner'
  | 'pubkey'
  | 'rent_epoch'
  | 'slot'
  | 'updated_on'
  | 'write_version'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_all_stddev_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_all_stddev_pop_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_all_stddev_samp_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_all_sum_fields {
  lamports?: Scalars['bigint']
  rent_epoch?: Scalars['bigint']
  slot?: Scalars['bigint']
  write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_all_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_all_var_pop_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_all_var_samp_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_all_variance_fields {
  lamports?: Scalars['Float']
  rent_epoch?: Scalars['Float']
  slot?: Scalars['Float']
  write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_all_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connection {
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  toprofile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_connection'
}

/** aggregated selection of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connection_aggregate {
  aggregate?: gum_0_1_0_decoded_connection_aggregate_fields
  nodes: gum_0_1_0_decoded_connection[]
  __typename: 'gum_0_1_0_decoded_connection_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connection_aggregate_fields {
  avg?: gum_0_1_0_decoded_connection_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_connection_max_fields
  min?: gum_0_1_0_decoded_connection_min_fields
  stddev?: gum_0_1_0_decoded_connection_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_connection_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_connection_stddev_samp_fields
  sum?: gum_0_1_0_decoded_connection_sum_fields
  var_pop?: gum_0_1_0_decoded_connection_var_pop_fields
  var_samp?: gum_0_1_0_decoded_connection_var_samp_fields
  variance?: gum_0_1_0_decoded_connection_variance_fields
  __typename: 'gum_0_1_0_decoded_connection_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_connection_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_connection_max_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  toprofile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_connection_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_connection_min_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  toprofile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_connection_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.connection" */
export type gum_0_1_0_decoded_connection_select_column =
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'fromprofile'
  | 'toprofile'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_connection_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_connection_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_connection_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_connection_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_connection_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_connection_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_connection_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_connection_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_connection_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_post {
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadata?: Scalars['json']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  randomhash?: Scalars['_int4']
  replyto?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_post'
}

/** aggregated selection of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_post_aggregate {
  aggregate?: gum_0_1_0_decoded_post_aggregate_fields
  nodes: gum_0_1_0_decoded_post[]
  __typename: 'gum_0_1_0_decoded_post_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_post_aggregate_fields {
  avg?: gum_0_1_0_decoded_post_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_post_max_fields
  min?: gum_0_1_0_decoded_post_min_fields
  stddev?: gum_0_1_0_decoded_post_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_post_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_post_stddev_samp_fields
  sum?: gum_0_1_0_decoded_post_sum_fields
  var_pop?: gum_0_1_0_decoded_post_var_pop_fields
  var_samp?: gum_0_1_0_decoded_post_var_samp_fields
  variance?: gum_0_1_0_decoded_post_variance_fields
  __typename: 'gum_0_1_0_decoded_post_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_post_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_post_max_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  replyto?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_post_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_post_min_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  replyto?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_post_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.post" */
export type gum_0_1_0_decoded_post_select_column =
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'metadata'
  | 'metadatauri'
  | 'profile'
  | 'randomhash'
  | 'replyto'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_post_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_post_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_post_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_post_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_post_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_post_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_post_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_post_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_post_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profile {
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  namespace?: Scalars['String']
  username?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profile'
}

/** aggregated selection of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profile_aggregate {
  aggregate?: gum_0_1_0_decoded_profile_aggregate_fields
  nodes: gum_0_1_0_decoded_profile[]
  __typename: 'gum_0_1_0_decoded_profile_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profile_aggregate_fields {
  avg?: gum_0_1_0_decoded_profile_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_profile_max_fields
  min?: gum_0_1_0_decoded_profile_min_fields
  stddev?: gum_0_1_0_decoded_profile_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_profile_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_profile_stddev_samp_fields
  sum?: gum_0_1_0_decoded_profile_sum_fields
  var_pop?: gum_0_1_0_decoded_profile_var_pop_fields
  var_samp?: gum_0_1_0_decoded_profile_var_samp_fields
  variance?: gum_0_1_0_decoded_profile_variance_fields
  __typename: 'gum_0_1_0_decoded_profile_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_profile_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_profile_max_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  namespace?: Scalars['String']
  username?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profile_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_profile_min_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  namespace?: Scalars['String']
  username?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profile_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.profile" */
export type gum_0_1_0_decoded_profile_select_column =
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'namespace'
  | 'username'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_profile_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_profile_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_profile_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_profile_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_profile_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_profile_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_profile_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_profile_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profile_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata {
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadata?: Scalars['json']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profilemetadata'
}

/** aggregated selection of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata_aggregate {
  aggregate?: gum_0_1_0_decoded_profilemetadata_aggregate_fields
  nodes: gum_0_1_0_decoded_profilemetadata[]
  __typename: 'gum_0_1_0_decoded_profilemetadata_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata_aggregate_fields {
  avg?: gum_0_1_0_decoded_profilemetadata_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_profilemetadata_max_fields
  min?: gum_0_1_0_decoded_profilemetadata_min_fields
  stddev?: gum_0_1_0_decoded_profilemetadata_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_profilemetadata_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_profilemetadata_stddev_samp_fields
  sum?: gum_0_1_0_decoded_profilemetadata_sum_fields
  var_pop?: gum_0_1_0_decoded_profilemetadata_var_pop_fields
  var_samp?: gum_0_1_0_decoded_profilemetadata_var_samp_fields
  variance?: gum_0_1_0_decoded_profilemetadata_variance_fields
  __typename: 'gum_0_1_0_decoded_profilemetadata_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_profilemetadata_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_profilemetadata_max_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profilemetadata_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_profilemetadata_min_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  metadatauri?: Scalars['String']
  profile?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_profilemetadata_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.profilemetadata" */
export type gum_0_1_0_decoded_profilemetadata_select_column =
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'metadata'
  | 'metadatauri'
  | 'profile'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_profilemetadata_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_profilemetadata_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_profilemetadata_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_profilemetadata_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_profilemetadata_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_profilemetadata_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reaction {
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  reactiontype?: Scalars['String']
  topost?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_reaction'
}

/** aggregated selection of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reaction_aggregate {
  aggregate?: gum_0_1_0_decoded_reaction_aggregate_fields
  nodes: gum_0_1_0_decoded_reaction[]
  __typename: 'gum_0_1_0_decoded_reaction_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reaction_aggregate_fields {
  avg?: gum_0_1_0_decoded_reaction_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_reaction_max_fields
  min?: gum_0_1_0_decoded_reaction_min_fields
  stddev?: gum_0_1_0_decoded_reaction_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_reaction_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_reaction_stddev_samp_fields
  sum?: gum_0_1_0_decoded_reaction_sum_fields
  var_pop?: gum_0_1_0_decoded_reaction_var_pop_fields
  var_samp?: gum_0_1_0_decoded_reaction_var_samp_fields
  variance?: gum_0_1_0_decoded_reaction_variance_fields
  __typename: 'gum_0_1_0_decoded_reaction_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_reaction_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_reaction_max_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  reactiontype?: Scalars['String']
  topost?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_reaction_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_reaction_min_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  fromprofile?: Scalars['String']
  reactiontype?: Scalars['String']
  topost?: Scalars['String']
  __typename: 'gum_0_1_0_decoded_reaction_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.reaction" */
export type gum_0_1_0_decoded_reaction_select_column =
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'fromprofile'
  | 'reactiontype'
  | 'topost'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_reaction_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_reaction_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_reaction_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_reaction_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_reaction_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_reaction_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_reaction_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_reaction_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_reaction_variance_fields'
}

/** columns and relationships of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_user {
  authority?: Scalars['String']
  cl_bf?: Scalars['Boolean']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_executable?: Scalars['Boolean']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_txn_signature?: Scalars['bytea']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  randomhash?: Scalars['_int4']
  __typename: 'gum_0_1_0_decoded_user'
}

/** aggregated selection of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_user_aggregate {
  aggregate?: gum_0_1_0_decoded_user_aggregate_fields
  nodes: gum_0_1_0_decoded_user[]
  __typename: 'gum_0_1_0_decoded_user_aggregate'
}

/** aggregate fields of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_user_aggregate_fields {
  avg?: gum_0_1_0_decoded_user_avg_fields
  count: Scalars['Int']
  max?: gum_0_1_0_decoded_user_max_fields
  min?: gum_0_1_0_decoded_user_min_fields
  stddev?: gum_0_1_0_decoded_user_stddev_fields
  stddev_pop?: gum_0_1_0_decoded_user_stddev_pop_fields
  stddev_samp?: gum_0_1_0_decoded_user_stddev_samp_fields
  sum?: gum_0_1_0_decoded_user_sum_fields
  var_pop?: gum_0_1_0_decoded_user_var_pop_fields
  var_samp?: gum_0_1_0_decoded_user_var_samp_fields
  variance?: gum_0_1_0_decoded_user_variance_fields
  __typename: 'gum_0_1_0_decoded_user_aggregate_fields'
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_user_avg_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_avg_fields'
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_user_max_fields {
  authority?: Scalars['String']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_user_max_fields'
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_user_min_fields {
  authority?: Scalars['String']
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_owner?: Scalars['String']
  cl_pubkey?: Scalars['String']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_updated_on?: Scalars['timestamp']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_user_min_fields'
}

/** select columns of table "gum_0_1_0_decoded.user" */
export type gum_0_1_0_decoded_user_select_column =
  | 'authority'
  | 'cl_bf'
  | 'cl_decoded_updated_on'
  | 'cl_executable'
  | 'cl_lamports'
  | 'cl_owner'
  | 'cl_pubkey'
  | 'cl_rent_epoch'
  | 'cl_slot'
  | 'cl_txn_signature'
  | 'cl_updated_on'
  | 'cl_write_version'
  | 'randomhash'

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_user_stddev_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_user_stddev_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_user_stddev_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_user_sum_fields {
  cl_decoded_updated_on?: Scalars['bigint']
  cl_lamports?: Scalars['bigint']
  cl_rent_epoch?: Scalars['bigint']
  cl_slot?: Scalars['bigint']
  cl_write_version?: Scalars['bigint']
  __typename: 'gum_0_1_0_decoded_user_sum_fields'
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_user_var_pop_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_user_var_samp_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_var_samp_fields'
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_user_variance_fields {
  cl_decoded_updated_on?: Scalars['Float']
  cl_lamports?: Scalars['Float']
  cl_rent_epoch?: Scalars['Float']
  cl_slot?: Scalars['Float']
  cl_write_version?: Scalars['Float']
  __typename: 'gum_0_1_0_decoded_user_variance_fields'
}

/** column ordering options */
export type order_by = 'asc' | 'asc_nulls_first' | 'asc_nulls_last' | 'desc' | 'desc_nulls_first' | 'desc_nulls_last'

export interface query_root {
  /** fetch data from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all: gum_0_1_0_decoded_all[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_aggregate: gum_0_1_0_decoded_all_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.all" using primary key columns */
  gum_0_1_0_decoded_all_by_pk?: gum_0_1_0_decoded_all
  /** fetch data from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection: gum_0_1_0_decoded_connection[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_aggregate: gum_0_1_0_decoded_connection_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.connection" using primary key columns */
  gum_0_1_0_decoded_connection_by_pk?: gum_0_1_0_decoded_connection
  /** fetch data from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post: gum_0_1_0_decoded_post[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_aggregate: gum_0_1_0_decoded_post_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.post" using primary key columns */
  gum_0_1_0_decoded_post_by_pk?: gum_0_1_0_decoded_post
  /** fetch data from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile: gum_0_1_0_decoded_profile[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_aggregate: gum_0_1_0_decoded_profile_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.profile" using primary key columns */
  gum_0_1_0_decoded_profile_by_pk?: gum_0_1_0_decoded_profile
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata: gum_0_1_0_decoded_profilemetadata[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_aggregate: gum_0_1_0_decoded_profilemetadata_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" using primary key columns */
  gum_0_1_0_decoded_profilemetadata_by_pk?: gum_0_1_0_decoded_profilemetadata
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction: gum_0_1_0_decoded_reaction[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_aggregate: gum_0_1_0_decoded_reaction_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" using primary key columns */
  gum_0_1_0_decoded_reaction_by_pk?: gum_0_1_0_decoded_reaction
  /** fetch data from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user: gum_0_1_0_decoded_user[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_aggregate: gum_0_1_0_decoded_user_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.user" using primary key columns */
  gum_0_1_0_decoded_user_by_pk?: gum_0_1_0_decoded_user
  __typename: 'query_root'
}

export interface subscription_root {
  /** fetch data from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all: gum_0_1_0_decoded_all[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_aggregate: gum_0_1_0_decoded_all_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.all" using primary key columns */
  gum_0_1_0_decoded_all_by_pk?: gum_0_1_0_decoded_all
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_stream: gum_0_1_0_decoded_all[]
  /** fetch data from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection: gum_0_1_0_decoded_connection[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_aggregate: gum_0_1_0_decoded_connection_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.connection" using primary key columns */
  gum_0_1_0_decoded_connection_by_pk?: gum_0_1_0_decoded_connection
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_stream: gum_0_1_0_decoded_connection[]
  /** fetch data from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post: gum_0_1_0_decoded_post[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_aggregate: gum_0_1_0_decoded_post_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.post" using primary key columns */
  gum_0_1_0_decoded_post_by_pk?: gum_0_1_0_decoded_post
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_stream: gum_0_1_0_decoded_post[]
  /** fetch data from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile: gum_0_1_0_decoded_profile[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_aggregate: gum_0_1_0_decoded_profile_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.profile" using primary key columns */
  gum_0_1_0_decoded_profile_by_pk?: gum_0_1_0_decoded_profile
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_stream: gum_0_1_0_decoded_profile[]
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata: gum_0_1_0_decoded_profilemetadata[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_aggregate: gum_0_1_0_decoded_profilemetadata_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" using primary key columns */
  gum_0_1_0_decoded_profilemetadata_by_pk?: gum_0_1_0_decoded_profilemetadata
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_stream: gum_0_1_0_decoded_profilemetadata[]
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction: gum_0_1_0_decoded_reaction[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_aggregate: gum_0_1_0_decoded_reaction_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" using primary key columns */
  gum_0_1_0_decoded_reaction_by_pk?: gum_0_1_0_decoded_reaction
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_stream: gum_0_1_0_decoded_reaction[]
  /** fetch data from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user: gum_0_1_0_decoded_user[]
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_aggregate: gum_0_1_0_decoded_user_aggregate
  /** fetch data from the table: "gum_0_1_0_decoded.user" using primary key columns */
  gum_0_1_0_decoded_user_by_pk?: gum_0_1_0_decoded_user
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_stream: gum_0_1_0_decoded_user[]
  __typename: 'subscription_root'
}

export type Query = query_root
export type Subscription = subscription_root

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {
  _eq?: Scalars['Boolean'] | null
  _gt?: Scalars['Boolean'] | null
  _gte?: Scalars['Boolean'] | null
  _in?: Scalars['Boolean'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['Boolean'] | null
  _lte?: Scalars['Boolean'] | null
  _neq?: Scalars['Boolean'] | null
  _nin?: Scalars['Boolean'][] | null
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: Scalars['String'] | null
  _gt?: Scalars['String'] | null
  _gte?: Scalars['String'] | null
  /** does the column match the given case-insensitive pattern */
  _ilike?: Scalars['String'] | null
  _in?: Scalars['String'][] | null
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Scalars['String'] | null
  _is_null?: Scalars['Boolean'] | null
  /** does the column match the given pattern */
  _like?: Scalars['String'] | null
  _lt?: Scalars['String'] | null
  _lte?: Scalars['String'] | null
  _neq?: Scalars['String'] | null
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Scalars['String'] | null
  _nin?: Scalars['String'][] | null
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Scalars['String'] | null
  /** does the column NOT match the given pattern */
  _nlike?: Scalars['String'] | null
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Scalars['String'] | null
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Scalars['String'] | null
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Scalars['String'] | null
  /** does the column match the given SQL regular expression */
  _similar?: Scalars['String'] | null
}

/** Boolean expression to compare columns of type "_int4". All fields are combined with logical 'AND'. */
export interface _int4_comparison_exp {
  _eq?: Scalars['_int4'] | null
  _gt?: Scalars['_int4'] | null
  _gte?: Scalars['_int4'] | null
  _in?: Scalars['_int4'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['_int4'] | null
  _lte?: Scalars['_int4'] | null
  _neq?: Scalars['_int4'] | null
  _nin?: Scalars['_int4'][] | null
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export interface bigint_comparison_exp {
  _eq?: Scalars['bigint'] | null
  _gt?: Scalars['bigint'] | null
  _gte?: Scalars['bigint'] | null
  _in?: Scalars['bigint'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['bigint'] | null
  _lte?: Scalars['bigint'] | null
  _neq?: Scalars['bigint'] | null
  _nin?: Scalars['bigint'][] | null
}

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export interface bytea_comparison_exp {
  _eq?: Scalars['bytea'] | null
  _gt?: Scalars['bytea'] | null
  _gte?: Scalars['bytea'] | null
  _in?: Scalars['bytea'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['bytea'] | null
  _lte?: Scalars['bytea'] | null
  _neq?: Scalars['bytea'] | null
  _nin?: Scalars['bytea'][] | null
}

/** columns and relationships of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_allGenqlSelection {
  account_decoded_data?:
    | {
        __args: {
          /** JSON select path */
          path?: Scalars['String'] | null
        }
      }
    | boolean
    | number
  account_raw_data?: boolean | number
  account_type?: boolean | number
  executable?: boolean | number
  is_bf?: boolean | number
  lamports?: boolean | number
  owner?: boolean | number
  pubkey?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  updated_on?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_all_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_all_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_allGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.all" */
export interface gum_0_1_0_decoded_all_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_all_avg_fieldsGenqlSelection
  count?:
    | { __args: { columns?: gum_0_1_0_decoded_all_select_column[] | null; distinct?: Scalars['Boolean'] | null } }
    | boolean
    | number
  max?: gum_0_1_0_decoded_all_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_all_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_all_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_all_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_all_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_all_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_all_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_all_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_all_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_all_avg_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.all". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_all_bool_exp {
  _and?: gum_0_1_0_decoded_all_bool_exp[] | null
  _not?: gum_0_1_0_decoded_all_bool_exp | null
  _or?: gum_0_1_0_decoded_all_bool_exp[] | null
  account_decoded_data?: json_comparison_exp | null
  account_raw_data?: bytea_comparison_exp | null
  account_type?: String_comparison_exp | null
  executable?: Boolean_comparison_exp | null
  is_bf?: Boolean_comparison_exp | null
  lamports?: bigint_comparison_exp | null
  owner?: String_comparison_exp | null
  pubkey?: String_comparison_exp | null
  rent_epoch?: bigint_comparison_exp | null
  slot?: bigint_comparison_exp | null
  updated_on?: timestamp_comparison_exp | null
  write_version?: bigint_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_all_max_fieldsGenqlSelection {
  account_type?: boolean | number
  lamports?: boolean | number
  owner?: boolean | number
  pubkey?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  updated_on?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_all_min_fieldsGenqlSelection {
  account_type?: boolean | number
  lamports?: boolean | number
  owner?: boolean | number
  pubkey?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  updated_on?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.all". */
export interface gum_0_1_0_decoded_all_order_by {
  account_decoded_data?: order_by | null
  account_raw_data?: order_by | null
  account_type?: order_by | null
  executable?: order_by | null
  is_bf?: order_by | null
  lamports?: order_by | null
  owner?: order_by | null
  pubkey?: order_by | null
  rent_epoch?: order_by | null
  slot?: order_by | null
  updated_on?: order_by | null
  write_version?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_all_stddev_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_all_stddev_pop_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_all_stddev_samp_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_all" */
export interface gum_0_1_0_decoded_all_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_all_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_all_stream_cursor_value_input {
  account_decoded_data?: Scalars['json'] | null
  account_raw_data?: Scalars['bytea'] | null
  account_type?: Scalars['String'] | null
  executable?: Scalars['Boolean'] | null
  is_bf?: Scalars['Boolean'] | null
  lamports?: Scalars['bigint'] | null
  owner?: Scalars['String'] | null
  pubkey?: Scalars['String'] | null
  rent_epoch?: Scalars['bigint'] | null
  slot?: Scalars['bigint'] | null
  updated_on?: Scalars['timestamp'] | null
  write_version?: Scalars['bigint'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_all_sum_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_all_var_pop_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_all_var_samp_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_all_variance_fieldsGenqlSelection {
  lamports?: boolean | number
  rent_epoch?: boolean | number
  slot?: boolean | number
  write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connectionGenqlSelection {
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  toprofile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connection_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_connection_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_connectionGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.connection" */
export interface gum_0_1_0_decoded_connection_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_connection_avg_fieldsGenqlSelection
  count?:
    | {
        __args: { columns?: gum_0_1_0_decoded_connection_select_column[] | null; distinct?: Scalars['Boolean'] | null }
      }
    | boolean
    | number
  max?: gum_0_1_0_decoded_connection_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_connection_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_connection_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_connection_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_connection_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_connection_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_connection_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_connection_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_connection_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_connection_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.connection". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_connection_bool_exp {
  _and?: gum_0_1_0_decoded_connection_bool_exp[] | null
  _not?: gum_0_1_0_decoded_connection_bool_exp | null
  _or?: gum_0_1_0_decoded_connection_bool_exp[] | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  fromprofile?: String_comparison_exp | null
  toprofile?: String_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_connection_max_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  toprofile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_connection_min_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  toprofile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.connection". */
export interface gum_0_1_0_decoded_connection_order_by {
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  fromprofile?: order_by | null
  toprofile?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_connection_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_connection_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_connection_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_connection" */
export interface gum_0_1_0_decoded_connection_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_connection_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_connection_stream_cursor_value_input {
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  fromprofile?: Scalars['String'] | null
  toprofile?: Scalars['String'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_connection_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_connection_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_connection_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_connection_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_postGenqlSelection {
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadata?:
    | {
        __args: {
          /** JSON select path */
          path?: Scalars['String'] | null
        }
      }
    | boolean
    | number
  metadatauri?: boolean | number
  profile?: boolean | number
  randomhash?: boolean | number
  replyto?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_post_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_post_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_postGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.post" */
export interface gum_0_1_0_decoded_post_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_post_avg_fieldsGenqlSelection
  count?:
    | { __args: { columns?: gum_0_1_0_decoded_post_select_column[] | null; distinct?: Scalars['Boolean'] | null } }
    | boolean
    | number
  max?: gum_0_1_0_decoded_post_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_post_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_post_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_post_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_post_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_post_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_post_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_post_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_post_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_post_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.post". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_post_bool_exp {
  _and?: gum_0_1_0_decoded_post_bool_exp[] | null
  _not?: gum_0_1_0_decoded_post_bool_exp | null
  _or?: gum_0_1_0_decoded_post_bool_exp[] | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  metadata?: json_comparison_exp | null
  metadatauri?: String_comparison_exp | null
  profile?: String_comparison_exp | null
  randomhash?: _int4_comparison_exp | null
  replyto?: String_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_post_max_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadatauri?: boolean | number
  profile?: boolean | number
  replyto?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_post_min_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadatauri?: boolean | number
  profile?: boolean | number
  replyto?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.post". */
export interface gum_0_1_0_decoded_post_order_by {
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  metadata?: order_by | null
  metadatauri?: order_by | null
  profile?: order_by | null
  randomhash?: order_by | null
  replyto?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_post_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_post_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_post_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_post" */
export interface gum_0_1_0_decoded_post_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_post_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_post_stream_cursor_value_input {
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  metadata?: Scalars['json'] | null
  metadatauri?: Scalars['String'] | null
  profile?: Scalars['String'] | null
  randomhash?: Scalars['_int4'] | null
  replyto?: Scalars['String'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_post_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_post_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_post_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_post_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profileGenqlSelection {
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  namespace?: boolean | number
  username?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profile_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_profile_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_profileGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.profile" */
export interface gum_0_1_0_decoded_profile_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_profile_avg_fieldsGenqlSelection
  count?:
    | { __args: { columns?: gum_0_1_0_decoded_profile_select_column[] | null; distinct?: Scalars['Boolean'] | null } }
    | boolean
    | number
  max?: gum_0_1_0_decoded_profile_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_profile_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_profile_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_profile_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_profile_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_profile_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_profile_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_profile_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_profile_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_profile_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.profile". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_profile_bool_exp {
  _and?: gum_0_1_0_decoded_profile_bool_exp[] | null
  _not?: gum_0_1_0_decoded_profile_bool_exp | null
  _or?: gum_0_1_0_decoded_profile_bool_exp[] | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  namespace?: String_comparison_exp | null
  username?: String_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_profile_max_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  namespace?: boolean | number
  username?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_profile_min_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  namespace?: boolean | number
  username?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.profile". */
export interface gum_0_1_0_decoded_profile_order_by {
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  namespace?: order_by | null
  username?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_profile_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_profile_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_profile_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_profile" */
export interface gum_0_1_0_decoded_profile_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_profile_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_profile_stream_cursor_value_input {
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  namespace?: Scalars['String'] | null
  username?: Scalars['String'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_profile_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_profile_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_profile_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_profile_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadataGenqlSelection {
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadata?:
    | {
        __args: {
          /** JSON select path */
          path?: Scalars['String'] | null
        }
      }
    | boolean
    | number
  metadatauri?: boolean | number
  profile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_profilemetadata_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_profilemetadataGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_profilemetadata_avg_fieldsGenqlSelection
  count?:
    | {
        __args: {
          columns?: gum_0_1_0_decoded_profilemetadata_select_column[] | null
          distinct?: Scalars['Boolean'] | null
        }
      }
    | boolean
    | number
  max?: gum_0_1_0_decoded_profilemetadata_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_profilemetadata_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_profilemetadata_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_profilemetadata_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_profilemetadata_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_profilemetadata_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_profilemetadata_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_profilemetadata_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_profilemetadata_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_profilemetadata_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.profilemetadata". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_profilemetadata_bool_exp {
  _and?: gum_0_1_0_decoded_profilemetadata_bool_exp[] | null
  _not?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
  _or?: gum_0_1_0_decoded_profilemetadata_bool_exp[] | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  metadata?: json_comparison_exp | null
  metadatauri?: String_comparison_exp | null
  profile?: String_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_profilemetadata_max_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadatauri?: boolean | number
  profile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_profilemetadata_min_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  metadatauri?: boolean | number
  profile?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.profilemetadata". */
export interface gum_0_1_0_decoded_profilemetadata_order_by {
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  metadata?: order_by | null
  metadatauri?: order_by | null
  profile?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_profilemetadata_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_profilemetadata" */
export interface gum_0_1_0_decoded_profilemetadata_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_profilemetadata_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_profilemetadata_stream_cursor_value_input {
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  metadata?: Scalars['json'] | null
  metadatauri?: Scalars['String'] | null
  profile?: Scalars['String'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_profilemetadata_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_profilemetadata_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_profilemetadata_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_profilemetadata_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reactionGenqlSelection {
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  reactiontype?: boolean | number
  topost?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reaction_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_reaction_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_reactionGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.reaction" */
export interface gum_0_1_0_decoded_reaction_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_reaction_avg_fieldsGenqlSelection
  count?:
    | { __args: { columns?: gum_0_1_0_decoded_reaction_select_column[] | null; distinct?: Scalars['Boolean'] | null } }
    | boolean
    | number
  max?: gum_0_1_0_decoded_reaction_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_reaction_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_reaction_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_reaction_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_reaction_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_reaction_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_reaction_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_reaction_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_reaction_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_reaction_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.reaction". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_reaction_bool_exp {
  _and?: gum_0_1_0_decoded_reaction_bool_exp[] | null
  _not?: gum_0_1_0_decoded_reaction_bool_exp | null
  _or?: gum_0_1_0_decoded_reaction_bool_exp[] | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  fromprofile?: String_comparison_exp | null
  reactiontype?: String_comparison_exp | null
  topost?: String_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_reaction_max_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  reactiontype?: boolean | number
  topost?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_reaction_min_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  fromprofile?: boolean | number
  reactiontype?: boolean | number
  topost?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.reaction". */
export interface gum_0_1_0_decoded_reaction_order_by {
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  fromprofile?: order_by | null
  reactiontype?: order_by | null
  topost?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_reaction_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_reaction_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_reaction_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_reaction" */
export interface gum_0_1_0_decoded_reaction_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_reaction_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_reaction_stream_cursor_value_input {
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  fromprofile?: Scalars['String'] | null
  reactiontype?: Scalars['String'] | null
  topost?: Scalars['String'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_reaction_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_reaction_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_reaction_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_reaction_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** columns and relationships of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_userGenqlSelection {
  authority?: boolean | number
  cl_bf?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_executable?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_txn_signature?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  randomhash?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_user_aggregateGenqlSelection {
  aggregate?: gum_0_1_0_decoded_user_aggregate_fieldsGenqlSelection
  nodes?: gum_0_1_0_decoded_userGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "gum_0_1_0_decoded.user" */
export interface gum_0_1_0_decoded_user_aggregate_fieldsGenqlSelection {
  avg?: gum_0_1_0_decoded_user_avg_fieldsGenqlSelection
  count?:
    | { __args: { columns?: gum_0_1_0_decoded_user_select_column[] | null; distinct?: Scalars['Boolean'] | null } }
    | boolean
    | number
  max?: gum_0_1_0_decoded_user_max_fieldsGenqlSelection
  min?: gum_0_1_0_decoded_user_min_fieldsGenqlSelection
  stddev?: gum_0_1_0_decoded_user_stddev_fieldsGenqlSelection
  stddev_pop?: gum_0_1_0_decoded_user_stddev_pop_fieldsGenqlSelection
  stddev_samp?: gum_0_1_0_decoded_user_stddev_samp_fieldsGenqlSelection
  sum?: gum_0_1_0_decoded_user_sum_fieldsGenqlSelection
  var_pop?: gum_0_1_0_decoded_user_var_pop_fieldsGenqlSelection
  var_samp?: gum_0_1_0_decoded_user_var_samp_fieldsGenqlSelection
  variance?: gum_0_1_0_decoded_user_variance_fieldsGenqlSelection
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface gum_0_1_0_decoded_user_avg_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to filter rows from the table "gum_0_1_0_decoded.user". All fields are combined with a logical 'AND'. */
export interface gum_0_1_0_decoded_user_bool_exp {
  _and?: gum_0_1_0_decoded_user_bool_exp[] | null
  _not?: gum_0_1_0_decoded_user_bool_exp | null
  _or?: gum_0_1_0_decoded_user_bool_exp[] | null
  authority?: String_comparison_exp | null
  cl_bf?: Boolean_comparison_exp | null
  cl_decoded_updated_on?: bigint_comparison_exp | null
  cl_executable?: Boolean_comparison_exp | null
  cl_lamports?: bigint_comparison_exp | null
  cl_owner?: String_comparison_exp | null
  cl_pubkey?: String_comparison_exp | null
  cl_rent_epoch?: bigint_comparison_exp | null
  cl_slot?: bigint_comparison_exp | null
  cl_txn_signature?: bytea_comparison_exp | null
  cl_updated_on?: timestamp_comparison_exp | null
  cl_write_version?: bigint_comparison_exp | null
  randomhash?: _int4_comparison_exp | null
}

/** aggregate max on columns */
export interface gum_0_1_0_decoded_user_max_fieldsGenqlSelection {
  authority?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface gum_0_1_0_decoded_user_min_fieldsGenqlSelection {
  authority?: boolean | number
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_owner?: boolean | number
  cl_pubkey?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_updated_on?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "gum_0_1_0_decoded.user". */
export interface gum_0_1_0_decoded_user_order_by {
  authority?: order_by | null
  cl_bf?: order_by | null
  cl_decoded_updated_on?: order_by | null
  cl_executable?: order_by | null
  cl_lamports?: order_by | null
  cl_owner?: order_by | null
  cl_pubkey?: order_by | null
  cl_rent_epoch?: order_by | null
  cl_slot?: order_by | null
  cl_txn_signature?: order_by | null
  cl_updated_on?: order_by | null
  cl_write_version?: order_by | null
  randomhash?: order_by | null
}

/** aggregate stddev on columns */
export interface gum_0_1_0_decoded_user_stddev_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface gum_0_1_0_decoded_user_stddev_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface gum_0_1_0_decoded_user_stddev_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Streaming cursor of the table "gum_0_1_0_decoded_user" */
export interface gum_0_1_0_decoded_user_stream_cursor_input {
  /** Stream column input with initial value */
  initial_value: gum_0_1_0_decoded_user_stream_cursor_value_input
  /** cursor ordering */
  ordering?: cursor_ordering | null
}

/** Initial value of the column from where the streaming should start */
export interface gum_0_1_0_decoded_user_stream_cursor_value_input {
  authority?: Scalars['String'] | null
  cl_bf?: Scalars['Boolean'] | null
  cl_decoded_updated_on?: Scalars['bigint'] | null
  cl_executable?: Scalars['Boolean'] | null
  cl_lamports?: Scalars['bigint'] | null
  cl_owner?: Scalars['String'] | null
  cl_pubkey?: Scalars['String'] | null
  cl_rent_epoch?: Scalars['bigint'] | null
  cl_slot?: Scalars['bigint'] | null
  cl_txn_signature?: Scalars['bytea'] | null
  cl_updated_on?: Scalars['timestamp'] | null
  cl_write_version?: Scalars['bigint'] | null
  randomhash?: Scalars['_int4'] | null
}

/** aggregate sum on columns */
export interface gum_0_1_0_decoded_user_sum_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface gum_0_1_0_decoded_user_var_pop_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface gum_0_1_0_decoded_user_var_samp_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface gum_0_1_0_decoded_user_variance_fieldsGenqlSelection {
  cl_decoded_updated_on?: boolean | number
  cl_lamports?: boolean | number
  cl_rent_epoch?: boolean | number
  cl_slot?: boolean | number
  cl_write_version?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export interface json_comparison_exp {
  _eq?: Scalars['json'] | null
  _gt?: Scalars['json'] | null
  _gte?: Scalars['json'] | null
  _in?: Scalars['json'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['json'] | null
  _lte?: Scalars['json'] | null
  _neq?: Scalars['json'] | null
  _nin?: Scalars['json'][] | null
}

export interface query_rootGenqlSelection {
  /** fetch data from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all?: gum_0_1_0_decoded_allGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_all_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_all_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_all_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_aggregate?: gum_0_1_0_decoded_all_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_all_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_all_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_all_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.all" using primary key columns */
  gum_0_1_0_decoded_all_by_pk?: gum_0_1_0_decoded_allGenqlSelection & { __args: { pubkey: Scalars['String'] } }
  /** fetch data from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection?: gum_0_1_0_decoded_connectionGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_connection_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_connection_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_connection_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_aggregate?: gum_0_1_0_decoded_connection_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_connection_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_connection_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_connection_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.connection" using primary key columns */
  gum_0_1_0_decoded_connection_by_pk?: gum_0_1_0_decoded_connectionGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post?: gum_0_1_0_decoded_postGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_post_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_post_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_post_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_aggregate?: gum_0_1_0_decoded_post_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_post_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_post_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_post_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.post" using primary key columns */
  gum_0_1_0_decoded_post_by_pk?: gum_0_1_0_decoded_postGenqlSelection & { __args: { cl_pubkey: Scalars['String'] } }
  /** fetch data from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile?: gum_0_1_0_decoded_profileGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profile_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profile_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profile_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_aggregate?: gum_0_1_0_decoded_profile_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profile_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profile_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profile_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profile" using primary key columns */
  gum_0_1_0_decoded_profile_by_pk?: gum_0_1_0_decoded_profileGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata?: gum_0_1_0_decoded_profilemetadataGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profilemetadata_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profilemetadata_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_aggregate?: gum_0_1_0_decoded_profilemetadata_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profilemetadata_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profilemetadata_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" using primary key columns */
  gum_0_1_0_decoded_profilemetadata_by_pk?: gum_0_1_0_decoded_profilemetadataGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction?: gum_0_1_0_decoded_reactionGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_reaction_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_reaction_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_reaction_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_aggregate?: gum_0_1_0_decoded_reaction_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_reaction_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_reaction_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_reaction_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" using primary key columns */
  gum_0_1_0_decoded_reaction_by_pk?: gum_0_1_0_decoded_reactionGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user?: gum_0_1_0_decoded_userGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_user_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_user_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_user_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_aggregate?: gum_0_1_0_decoded_user_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_user_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_user_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_user_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.user" using primary key columns */
  gum_0_1_0_decoded_user_by_pk?: gum_0_1_0_decoded_userGenqlSelection & { __args: { cl_pubkey: Scalars['String'] } }
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface subscription_rootGenqlSelection {
  /** fetch data from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all?: gum_0_1_0_decoded_allGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_all_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_all_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_all_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_aggregate?: gum_0_1_0_decoded_all_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_all_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_all_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_all_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.all" using primary key columns */
  gum_0_1_0_decoded_all_by_pk?: gum_0_1_0_decoded_allGenqlSelection & { __args: { pubkey: Scalars['String'] } }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.all" */
  gum_0_1_0_decoded_all_stream?: gum_0_1_0_decoded_allGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_all_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_all_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection?: gum_0_1_0_decoded_connectionGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_connection_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_connection_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_connection_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_aggregate?: gum_0_1_0_decoded_connection_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_connection_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_connection_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_connection_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.connection" using primary key columns */
  gum_0_1_0_decoded_connection_by_pk?: gum_0_1_0_decoded_connectionGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.connection" */
  gum_0_1_0_decoded_connection_stream?: gum_0_1_0_decoded_connectionGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_connection_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_connection_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post?: gum_0_1_0_decoded_postGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_post_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_post_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_post_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_aggregate?: gum_0_1_0_decoded_post_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_post_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_post_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_post_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.post" using primary key columns */
  gum_0_1_0_decoded_post_by_pk?: gum_0_1_0_decoded_postGenqlSelection & { __args: { cl_pubkey: Scalars['String'] } }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.post" */
  gum_0_1_0_decoded_post_stream?: gum_0_1_0_decoded_postGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_post_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_post_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile?: gum_0_1_0_decoded_profileGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profile_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profile_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profile_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_aggregate?: gum_0_1_0_decoded_profile_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profile_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profile_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profile_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profile" using primary key columns */
  gum_0_1_0_decoded_profile_by_pk?: gum_0_1_0_decoded_profileGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.profile" */
  gum_0_1_0_decoded_profile_stream?: gum_0_1_0_decoded_profileGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_profile_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profile_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata?: gum_0_1_0_decoded_profilemetadataGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profilemetadata_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profilemetadata_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_aggregate?: gum_0_1_0_decoded_profilemetadata_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_profilemetadata_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_profilemetadata_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.profilemetadata" using primary key columns */
  gum_0_1_0_decoded_profilemetadata_by_pk?: gum_0_1_0_decoded_profilemetadataGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.profilemetadata" */
  gum_0_1_0_decoded_profilemetadata_stream?: gum_0_1_0_decoded_profilemetadataGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_profilemetadata_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_profilemetadata_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction?: gum_0_1_0_decoded_reactionGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_reaction_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_reaction_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_reaction_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_aggregate?: gum_0_1_0_decoded_reaction_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_reaction_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_reaction_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_reaction_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.reaction" using primary key columns */
  gum_0_1_0_decoded_reaction_by_pk?: gum_0_1_0_decoded_reactionGenqlSelection & {
    __args: { cl_pubkey: Scalars['String'] }
  }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.reaction" */
  gum_0_1_0_decoded_reaction_stream?: gum_0_1_0_decoded_reactionGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_reaction_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_reaction_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user?: gum_0_1_0_decoded_userGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_user_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_user_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_user_bool_exp | null
    }
  }
  /** fetch aggregated fields from the table: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_aggregate?: gum_0_1_0_decoded_user_aggregateGenqlSelection & {
    __args?: {
      /** distinct select on columns */
      distinct_on?: gum_0_1_0_decoded_user_select_column[] | null
      /** limit the number of rows returned */
      limit?: Scalars['Int'] | null
      /** skip the first n rows. Use only with order_by */
      offset?: Scalars['Int'] | null
      /** sort the rows by one or more columns */
      order_by?: gum_0_1_0_decoded_user_order_by[] | null
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_user_bool_exp | null
    }
  }
  /** fetch data from the table: "gum_0_1_0_decoded.user" using primary key columns */
  gum_0_1_0_decoded_user_by_pk?: gum_0_1_0_decoded_userGenqlSelection & { __args: { cl_pubkey: Scalars['String'] } }
  /** fetch data from the table in a streaming manner: "gum_0_1_0_decoded.user" */
  gum_0_1_0_decoded_user_stream?: gum_0_1_0_decoded_userGenqlSelection & {
    __args: {
      /** maximum number of rows returned in a single batch */
      batch_size: Scalars['Int']
      /** cursor to stream the results returned by the query */
      cursor: (gum_0_1_0_decoded_user_stream_cursor_input | null)[]
      /** filter the rows returned */
      where?: gum_0_1_0_decoded_user_bool_exp | null
    }
  }
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export interface timestamp_comparison_exp {
  _eq?: Scalars['timestamp'] | null
  _gt?: Scalars['timestamp'] | null
  _gte?: Scalars['timestamp'] | null
  _in?: Scalars['timestamp'][] | null
  _is_null?: Scalars['Boolean'] | null
  _lt?: Scalars['timestamp'] | null
  _lte?: Scalars['timestamp'] | null
  _neq?: Scalars['timestamp'] | null
  _nin?: Scalars['timestamp'][] | null
}

export type QueryGenqlSelection = query_rootGenqlSelection
export type SubscriptionGenqlSelection = subscription_rootGenqlSelection

const gum_0_1_0_decoded_all_possibleTypes: string[] = ['gum_0_1_0_decoded_all']
export const isgum_0_1_0_decoded_all = (obj?: { __typename?: any } | null): obj is gum_0_1_0_decoded_all => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all"')
  return gum_0_1_0_decoded_all_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_all_aggregate']
export const isgum_0_1_0_decoded_all_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_aggregate"')
  return gum_0_1_0_decoded_all_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_aggregate_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_aggregate_fields']
export const isgum_0_1_0_decoded_all_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_aggregate_fields"')
  return gum_0_1_0_decoded_all_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_avg_fields']
export const isgum_0_1_0_decoded_all_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_avg_fields"')
  return gum_0_1_0_decoded_all_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_max_fields']
export const isgum_0_1_0_decoded_all_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_max_fields"')
  return gum_0_1_0_decoded_all_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_min_fields']
export const isgum_0_1_0_decoded_all_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_min_fields"')
  return gum_0_1_0_decoded_all_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_stddev_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_stddev_fields']
export const isgum_0_1_0_decoded_all_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_stddev_fields"')
  return gum_0_1_0_decoded_all_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_stddev_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_stddev_pop_fields']
export const isgum_0_1_0_decoded_all_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_stddev_pop_fields"')
  return gum_0_1_0_decoded_all_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_stddev_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_stddev_samp_fields']
export const isgum_0_1_0_decoded_all_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_stddev_samp_fields"')
  return gum_0_1_0_decoded_all_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_sum_fields']
export const isgum_0_1_0_decoded_all_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_sum_fields"')
  return gum_0_1_0_decoded_all_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_var_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_var_pop_fields']
export const isgum_0_1_0_decoded_all_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_var_pop_fields"')
  return gum_0_1_0_decoded_all_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_var_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_var_samp_fields']
export const isgum_0_1_0_decoded_all_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_var_samp_fields"')
  return gum_0_1_0_decoded_all_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_all_variance_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_all_variance_fields']
export const isgum_0_1_0_decoded_all_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_all_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_all_variance_fields"')
  return gum_0_1_0_decoded_all_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_possibleTypes: string[] = ['gum_0_1_0_decoded_connection']
export const isgum_0_1_0_decoded_connection = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection"')
  return gum_0_1_0_decoded_connection_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_connection_aggregate']
export const isgum_0_1_0_decoded_connection_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_aggregate"')
  return gum_0_1_0_decoded_connection_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_aggregate_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_aggregate_fields',
]
export const isgum_0_1_0_decoded_connection_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_aggregate_fields"')
  return gum_0_1_0_decoded_connection_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_connection_avg_fields']
export const isgum_0_1_0_decoded_connection_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_avg_fields"')
  return gum_0_1_0_decoded_connection_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_connection_max_fields']
export const isgum_0_1_0_decoded_connection_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_max_fields"')
  return gum_0_1_0_decoded_connection_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_connection_min_fields']
export const isgum_0_1_0_decoded_connection_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_min_fields"')
  return gum_0_1_0_decoded_connection_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_stddev_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_stddev_fields',
]
export const isgum_0_1_0_decoded_connection_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_stddev_fields"')
  return gum_0_1_0_decoded_connection_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_stddev_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_stddev_pop_fields',
]
export const isgum_0_1_0_decoded_connection_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_stddev_pop_fields"')
  return gum_0_1_0_decoded_connection_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_stddev_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_stddev_samp_fields',
]
export const isgum_0_1_0_decoded_connection_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_stddev_samp_fields"')
  return gum_0_1_0_decoded_connection_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_connection_sum_fields']
export const isgum_0_1_0_decoded_connection_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_sum_fields"')
  return gum_0_1_0_decoded_connection_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_var_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_var_pop_fields',
]
export const isgum_0_1_0_decoded_connection_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_var_pop_fields"')
  return gum_0_1_0_decoded_connection_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_var_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_var_samp_fields',
]
export const isgum_0_1_0_decoded_connection_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_var_samp_fields"')
  return gum_0_1_0_decoded_connection_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_connection_variance_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_connection_variance_fields',
]
export const isgum_0_1_0_decoded_connection_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_connection_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_connection_variance_fields"')
  return gum_0_1_0_decoded_connection_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_possibleTypes: string[] = ['gum_0_1_0_decoded_post']
export const isgum_0_1_0_decoded_post = (obj?: { __typename?: any } | null): obj is gum_0_1_0_decoded_post => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post"')
  return gum_0_1_0_decoded_post_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_post_aggregate']
export const isgum_0_1_0_decoded_post_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_aggregate"')
  return gum_0_1_0_decoded_post_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_aggregate_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_aggregate_fields']
export const isgum_0_1_0_decoded_post_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_aggregate_fields"')
  return gum_0_1_0_decoded_post_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_avg_fields']
export const isgum_0_1_0_decoded_post_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_avg_fields"')
  return gum_0_1_0_decoded_post_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_max_fields']
export const isgum_0_1_0_decoded_post_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_max_fields"')
  return gum_0_1_0_decoded_post_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_min_fields']
export const isgum_0_1_0_decoded_post_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_min_fields"')
  return gum_0_1_0_decoded_post_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_stddev_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_stddev_fields']
export const isgum_0_1_0_decoded_post_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_stddev_fields"')
  return gum_0_1_0_decoded_post_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_stddev_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_stddev_pop_fields']
export const isgum_0_1_0_decoded_post_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_stddev_pop_fields"')
  return gum_0_1_0_decoded_post_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_stddev_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_stddev_samp_fields']
export const isgum_0_1_0_decoded_post_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_stddev_samp_fields"')
  return gum_0_1_0_decoded_post_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_sum_fields']
export const isgum_0_1_0_decoded_post_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_sum_fields"')
  return gum_0_1_0_decoded_post_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_var_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_var_pop_fields']
export const isgum_0_1_0_decoded_post_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_var_pop_fields"')
  return gum_0_1_0_decoded_post_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_var_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_var_samp_fields']
export const isgum_0_1_0_decoded_post_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_var_samp_fields"')
  return gum_0_1_0_decoded_post_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_post_variance_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_post_variance_fields']
export const isgum_0_1_0_decoded_post_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_post_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_post_variance_fields"')
  return gum_0_1_0_decoded_post_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_possibleTypes: string[] = ['gum_0_1_0_decoded_profile']
export const isgum_0_1_0_decoded_profile = (obj?: { __typename?: any } | null): obj is gum_0_1_0_decoded_profile => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile"')
  return gum_0_1_0_decoded_profile_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_aggregate']
export const isgum_0_1_0_decoded_profile_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_aggregate"')
  return gum_0_1_0_decoded_profile_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_aggregate_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profile_aggregate_fields',
]
export const isgum_0_1_0_decoded_profile_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_aggregate_fields"')
  return gum_0_1_0_decoded_profile_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_avg_fields']
export const isgum_0_1_0_decoded_profile_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_avg_fields"')
  return gum_0_1_0_decoded_profile_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_max_fields']
export const isgum_0_1_0_decoded_profile_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_max_fields"')
  return gum_0_1_0_decoded_profile_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_min_fields']
export const isgum_0_1_0_decoded_profile_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_min_fields"')
  return gum_0_1_0_decoded_profile_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_stddev_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_stddev_fields']
export const isgum_0_1_0_decoded_profile_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_stddev_fields"')
  return gum_0_1_0_decoded_profile_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_stddev_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profile_stddev_pop_fields',
]
export const isgum_0_1_0_decoded_profile_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_stddev_pop_fields"')
  return gum_0_1_0_decoded_profile_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_stddev_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profile_stddev_samp_fields',
]
export const isgum_0_1_0_decoded_profile_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_stddev_samp_fields"')
  return gum_0_1_0_decoded_profile_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_sum_fields']
export const isgum_0_1_0_decoded_profile_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_sum_fields"')
  return gum_0_1_0_decoded_profile_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_var_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_var_pop_fields']
export const isgum_0_1_0_decoded_profile_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_var_pop_fields"')
  return gum_0_1_0_decoded_profile_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_var_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_var_samp_fields']
export const isgum_0_1_0_decoded_profile_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_var_samp_fields"')
  return gum_0_1_0_decoded_profile_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profile_variance_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_profile_variance_fields']
export const isgum_0_1_0_decoded_profile_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profile_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profile_variance_fields"')
  return gum_0_1_0_decoded_profile_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_possibleTypes: string[] = ['gum_0_1_0_decoded_profilemetadata']
export const isgum_0_1_0_decoded_profilemetadata = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata"')
  return gum_0_1_0_decoded_profilemetadata_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_aggregate_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_aggregate',
]
export const isgum_0_1_0_decoded_profilemetadata_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_aggregate"')
  return gum_0_1_0_decoded_profilemetadata_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_aggregate_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_aggregate_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_aggregate_fields => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_aggregate_fields"')
  return gum_0_1_0_decoded_profilemetadata_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_avg_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_avg_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_avg_fields"')
  return gum_0_1_0_decoded_profilemetadata_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_max_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_max_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_max_fields"')
  return gum_0_1_0_decoded_profilemetadata_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_min_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_min_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_min_fields"')
  return gum_0_1_0_decoded_profilemetadata_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_stddev_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_stddev_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_stddev_fields"')
  return gum_0_1_0_decoded_profilemetadata_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_stddev_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_stddev_pop_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_stddev_pop_fields => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_stddev_pop_fields"')
  return gum_0_1_0_decoded_profilemetadata_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_stddev_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_stddev_samp_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_stddev_samp_fields => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_stddev_samp_fields"')
  return gum_0_1_0_decoded_profilemetadata_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_sum_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_sum_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_sum_fields"')
  return gum_0_1_0_decoded_profilemetadata_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_var_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_var_pop_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_var_pop_fields"')
  return gum_0_1_0_decoded_profilemetadata_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_var_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_var_samp_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_var_samp_fields => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_var_samp_fields"')
  return gum_0_1_0_decoded_profilemetadata_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_profilemetadata_variance_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_profilemetadata_variance_fields',
]
export const isgum_0_1_0_decoded_profilemetadata_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_profilemetadata_variance_fields => {
  if (!obj?.__typename)
    throw new Error('__typename is missing in "isgum_0_1_0_decoded_profilemetadata_variance_fields"')
  return gum_0_1_0_decoded_profilemetadata_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction']
export const isgum_0_1_0_decoded_reaction = (obj?: { __typename?: any } | null): obj is gum_0_1_0_decoded_reaction => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction"')
  return gum_0_1_0_decoded_reaction_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_aggregate']
export const isgum_0_1_0_decoded_reaction_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_aggregate"')
  return gum_0_1_0_decoded_reaction_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_aggregate_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_reaction_aggregate_fields',
]
export const isgum_0_1_0_decoded_reaction_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_aggregate_fields"')
  return gum_0_1_0_decoded_reaction_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_avg_fields']
export const isgum_0_1_0_decoded_reaction_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_avg_fields"')
  return gum_0_1_0_decoded_reaction_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_max_fields']
export const isgum_0_1_0_decoded_reaction_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_max_fields"')
  return gum_0_1_0_decoded_reaction_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_min_fields']
export const isgum_0_1_0_decoded_reaction_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_min_fields"')
  return gum_0_1_0_decoded_reaction_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_stddev_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_stddev_fields']
export const isgum_0_1_0_decoded_reaction_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_stddev_fields"')
  return gum_0_1_0_decoded_reaction_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_stddev_pop_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_reaction_stddev_pop_fields',
]
export const isgum_0_1_0_decoded_reaction_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_stddev_pop_fields"')
  return gum_0_1_0_decoded_reaction_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_stddev_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_reaction_stddev_samp_fields',
]
export const isgum_0_1_0_decoded_reaction_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_stddev_samp_fields"')
  return gum_0_1_0_decoded_reaction_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_sum_fields']
export const isgum_0_1_0_decoded_reaction_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_sum_fields"')
  return gum_0_1_0_decoded_reaction_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_var_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_reaction_var_pop_fields']
export const isgum_0_1_0_decoded_reaction_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_var_pop_fields"')
  return gum_0_1_0_decoded_reaction_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_var_samp_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_reaction_var_samp_fields',
]
export const isgum_0_1_0_decoded_reaction_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_var_samp_fields"')
  return gum_0_1_0_decoded_reaction_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_reaction_variance_fields_possibleTypes: string[] = [
  'gum_0_1_0_decoded_reaction_variance_fields',
]
export const isgum_0_1_0_decoded_reaction_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_reaction_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_reaction_variance_fields"')
  return gum_0_1_0_decoded_reaction_variance_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_possibleTypes: string[] = ['gum_0_1_0_decoded_user']
export const isgum_0_1_0_decoded_user = (obj?: { __typename?: any } | null): obj is gum_0_1_0_decoded_user => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user"')
  return gum_0_1_0_decoded_user_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_aggregate_possibleTypes: string[] = ['gum_0_1_0_decoded_user_aggregate']
export const isgum_0_1_0_decoded_user_aggregate = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_aggregate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_aggregate"')
  return gum_0_1_0_decoded_user_aggregate_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_aggregate_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_aggregate_fields']
export const isgum_0_1_0_decoded_user_aggregate_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_aggregate_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_aggregate_fields"')
  return gum_0_1_0_decoded_user_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_avg_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_avg_fields']
export const isgum_0_1_0_decoded_user_avg_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_avg_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_avg_fields"')
  return gum_0_1_0_decoded_user_avg_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_max_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_max_fields']
export const isgum_0_1_0_decoded_user_max_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_max_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_max_fields"')
  return gum_0_1_0_decoded_user_max_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_min_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_min_fields']
export const isgum_0_1_0_decoded_user_min_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_min_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_min_fields"')
  return gum_0_1_0_decoded_user_min_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_stddev_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_stddev_fields']
export const isgum_0_1_0_decoded_user_stddev_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_stddev_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_stddev_fields"')
  return gum_0_1_0_decoded_user_stddev_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_stddev_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_stddev_pop_fields']
export const isgum_0_1_0_decoded_user_stddev_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_stddev_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_stddev_pop_fields"')
  return gum_0_1_0_decoded_user_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_stddev_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_stddev_samp_fields']
export const isgum_0_1_0_decoded_user_stddev_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_stddev_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_stddev_samp_fields"')
  return gum_0_1_0_decoded_user_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_sum_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_sum_fields']
export const isgum_0_1_0_decoded_user_sum_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_sum_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_sum_fields"')
  return gum_0_1_0_decoded_user_sum_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_var_pop_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_var_pop_fields']
export const isgum_0_1_0_decoded_user_var_pop_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_var_pop_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_var_pop_fields"')
  return gum_0_1_0_decoded_user_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_var_samp_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_var_samp_fields']
export const isgum_0_1_0_decoded_user_var_samp_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_var_samp_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_var_samp_fields"')
  return gum_0_1_0_decoded_user_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const gum_0_1_0_decoded_user_variance_fields_possibleTypes: string[] = ['gum_0_1_0_decoded_user_variance_fields']
export const isgum_0_1_0_decoded_user_variance_fields = (
  obj?: { __typename?: any } | null,
): obj is gum_0_1_0_decoded_user_variance_fields => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isgum_0_1_0_decoded_user_variance_fields"')
  return gum_0_1_0_decoded_user_variance_fields_possibleTypes.includes(obj.__typename)
}

const query_root_possibleTypes: string[] = ['query_root']
export const isquery_root = (obj?: { __typename?: any } | null): obj is query_root => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isquery_root"')
  return query_root_possibleTypes.includes(obj.__typename)
}

const subscription_root_possibleTypes: string[] = ['subscription_root']
export const issubscription_root = (obj?: { __typename?: any } | null): obj is subscription_root => {
  if (!obj?.__typename) throw new Error('__typename is missing in "issubscription_root"')
  return subscription_root_possibleTypes.includes(obj.__typename)
}

export const enumcursorOrdering = {
  ASC: 'ASC' as const,
  DESC: 'DESC' as const,
}

export const enumgum010DecodedAllSelectColumn = {
  account_decoded_data: 'account_decoded_data' as const,
  account_raw_data: 'account_raw_data' as const,
  account_type: 'account_type' as const,
  executable: 'executable' as const,
  is_bf: 'is_bf' as const,
  lamports: 'lamports' as const,
  owner: 'owner' as const,
  pubkey: 'pubkey' as const,
  rent_epoch: 'rent_epoch' as const,
  slot: 'slot' as const,
  updated_on: 'updated_on' as const,
  write_version: 'write_version' as const,
}

export const enumgum010DecodedConnectionSelectColumn = {
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  fromprofile: 'fromprofile' as const,
  toprofile: 'toprofile' as const,
}

export const enumgum010DecodedPostSelectColumn = {
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  metadata: 'metadata' as const,
  metadatauri: 'metadatauri' as const,
  profile: 'profile' as const,
  randomhash: 'randomhash' as const,
  replyto: 'replyto' as const,
}

export const enumgum010DecodedProfileSelectColumn = {
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  namespace: 'namespace' as const,
  username: 'username' as const,
}

export const enumgum010DecodedProfilemetadataSelectColumn = {
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  metadata: 'metadata' as const,
  metadatauri: 'metadatauri' as const,
  profile: 'profile' as const,
}

export const enumgum010DecodedReactionSelectColumn = {
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  fromprofile: 'fromprofile' as const,
  reactiontype: 'reactiontype' as const,
  topost: 'topost' as const,
}

export const enumgum010DecodedUserSelectColumn = {
  authority: 'authority' as const,
  cl_bf: 'cl_bf' as const,
  cl_decoded_updated_on: 'cl_decoded_updated_on' as const,
  cl_executable: 'cl_executable' as const,
  cl_lamports: 'cl_lamports' as const,
  cl_owner: 'cl_owner' as const,
  cl_pubkey: 'cl_pubkey' as const,
  cl_rent_epoch: 'cl_rent_epoch' as const,
  cl_slot: 'cl_slot' as const,
  cl_txn_signature: 'cl_txn_signature' as const,
  cl_updated_on: 'cl_updated_on' as const,
  cl_write_version: 'cl_write_version' as const,
  randomhash: 'randomhash' as const,
}

export const enumorderBy = {
  asc: 'asc' as const,
  asc_nulls_first: 'asc_nulls_first' as const,
  asc_nulls_last: 'asc_nulls_last' as const,
  desc: 'desc' as const,
  desc_nulls_first: 'desc_nulls_first' as const,
  desc_nulls_last: 'desc_nulls_last' as const,
}
