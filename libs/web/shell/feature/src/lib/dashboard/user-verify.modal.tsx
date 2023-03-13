import { ActionIcon, Anchor, Box, Button, Code, Group, Modal, Stack, Text, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { PubKeyProfileBadge, showNotificationError, showNotificationSuccess, UiLoader } from '@pubkeyapp/web/ui/core'
import { formFieldText, UiForm, UiFormField } from '@pubkeyapp/web/ui/form'
import {
  Account,
  AccountType,
  NetworkType,
  User,
  UserUpdateUserInput,
  useUserUpdateUserMutation,
} from '@pubkeyapp/web/util/sdk'
import { IconDiscountCheck, IconDiscountCheckFilled } from '@tabler/icons-react'
import React, { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'

export function UserVerifyModal({ user }: { user: User }) {
  const [opened, { open, close }] = useDisclosure(false)
  const [, updateUserMutation] = useUserUpdateUserMutation()

  function updateUser(input: UserUpdateUserInput) {
    return updateUserMutation({ input })
      .then((res) => {
        modals.closeAll()
        if (res.error) {
          return showNotificationError(res.error.message)
        }
        if (!res.error && res.data?.item) {
          return showNotificationSuccess('Success')
        }
      })
      .catch((err) => showNotificationError(err.message))
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Group>
            <PubKeyProfileBadge label="Verified on PubKey" user={user} />
          </Group>
        }
        centered
        size="lg"
      >
        {user.gumUser ? (
          <AccountIsVerified account={user.gumUser} />
        ) : (
          <Stack align="center" my={32} spacing={32}>
            <Code color="red">FIXME: Add a text about verifying your Gum user...</Code>
            <Group>
              <Button>Verify User</Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <Tooltip label={user.gumUser ? 'Gum User Verified' : 'Verify your Gum User'}>
        <ActionIcon size="xs" variant="subtle" onClick={open}>
          <Text color={user.gumUser ? 'blue' : 'dimmed'} sx={{ display: 'flex' }}>
            <IconDiscountCheckFilled size={16} />
          </Text>
        </ActionIcon>
      </Tooltip>
    </>
  )
}

export function UserUsernameForm({
  user,
  updateUser,
}: {
  user: User
  updateUser: (user: Partial<UserUpdateUserInput>) => Promise<boolean | undefined>
}) {
  const fields: UiFormField<UserUpdateUserInput>[] = [formFieldText('username', { required: true })]

  return (
    <UiForm<UserUpdateUserInput> fields={fields} model={{ ...user }} submit={updateUser}>
      <Button type="submit">Save</Button>
    </UiForm>
  )
}

export function AccountIsVerified({ account }: { account: Account }) {
  return (
    <Stack align="center" my={32} spacing={32}>
      <Group position="center">
        <Text color="blue">
          <IconDiscountCheckFilled size={128} />
        </Text>
      </Group>
      <Stack align="center">
        <Box>
          <Text size="lg">
            This {account.type?.replace('Gum', 'Gum ')} is verified on {account?.network?.replace('Solana', 'Solana ')}
          </Text>
        </Box>
        <Anchor component={Link} to={`/account/${account.address}?cluster=${account?.network?.replace('Solana', '')}`}>
          <Code color="brand">{account.address}</Code>
        </Anchor>
      </Stack>
    </Stack>
  )
}

export function AccountIsNotVerified({
  network,
  type,
  onClick,
  icon,
  loading,
  more,
}: {
  network: NetworkType
  type: AccountType
  icon?: ReactNode
  loading?: boolean
  onClick: () => void
  more?: ReactNode
}) {
  const [showMore, setShowMore] = useState(false)
  const label = type.replace('Gum', 'Gum ')
  return (
    <Stack align="center" my={32} spacing={32}>
      <Text color="blue">{icon ? icon : <IconDiscountCheckFilled size={128} />}</Text>
      <Box>
        <Text size="lg">
          Please create your {label} account on {network?.replace('Solana', 'Solana ')}
        </Text>
      </Box>
      <Box>
        <Group>
          <Button loading={loading} onClick={onClick}>
            Create {label}
          </Button>
        </Group>
      </Box>
      {more ? (
        showMore ? (
          <Group position="center">
            <Box>{more}</Box>
            <Button variant="subtle" color="brand" onClick={() => setShowMore(false)}>
              Ok!
            </Button>
          </Group>
        ) : (
          <Button variant="subtle" color="brand" onClick={() => setShowMore(true)}>
            Learn more
          </Button>
        )
      ) : null}
    </Stack>
  )
}

export function AccountVerifyLoading({
  network,
  type,
  icon,
  verb,
}: {
  network: NetworkType
  type: AccountType
  icon?: ReactNode
  verb: string
}) {
  const label = type.replace('Gum', 'Gum ')
  return (
    <Stack align="center" my={32} spacing={32}>
      <Text color="grey">{icon ? icon : <IconDiscountCheck size={128} />}</Text>
      <Box>
        <Text size="lg">
          {verb ? verb : 'Verifying'} your {label} account on {network?.replace('Solana', 'Solana ')}
        </Text>
      </Box>
      <UiLoader />
    </Stack>
  )
}
