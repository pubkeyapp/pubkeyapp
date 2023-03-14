import { Box, Flex, Group, Stack, Text } from '@mantine/core'
import { showNotificationError, showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import { User, UserUpdateProfileInput, useUserUpdateProfileMutation } from '@pubkeyapp/web/util/sdk'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserSelectAvatarModal } from './user-select-avatar-modal'
import { UserUsernameModal } from './user-username.modal'

export function UserDashboardProfileCard({ user }: { user: User }) {
  return <Flex direction="column" align="center"></Flex>
}
