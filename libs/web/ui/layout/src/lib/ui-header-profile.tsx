import { Avatar, Badge, createStyles, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UserRole } from '@pubkeyapp/web/util/sdk'
import { IconChevronDown, IconQuestionMark, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  buttonActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}))

export function UiHeaderProfile() {
  const { logout, user } = useAuth()
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  return (
    <Menu
      width={260}
      position="bottom-end"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withArrow
      offset={2}
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.button, { [classes.buttonActive]: userMenuOpened })} disabled={!user}>
          <Group spacing={7}>
            {user?.avatarUrl ? (
              <Avatar src={user?.avatarUrl} alt={`Avatar of ${user?.name}`} radius="xl" size={28} />
            ) : (
              <IconUser size={28} stroke={1.5} />
            )}
            <IconChevronDown size={rem(16)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      {user ? (
        <Menu.Dropdown sx={{ zIndex: 999999 }}>
          <Menu.Label>
            <Group spacing={4}>
              <Text size="sm" sx={{ lineHeight: 1 }}>
                Signed in as
              </Text>

              <Text weight={'bold'} size="sm" sx={{ lineHeight: 1 }}>
                {user.name}
              </Text>
              {user?.role === UserRole.Admin ? <Badge>{user.role}</Badge> : null}
            </Group>
          </Menu.Label>
          <Menu.Divider />
          <Menu.Item component={Link} to={`${user.profileUrl}`}>
            Your Profile
          </Menu.Item>
          {user.role === UserRole.Admin ? (
            <>
              <Menu.Divider />
              <Menu.Item component={Link} to="/admin">
                Admin Dashboard
              </Menu.Item>
              <Menu.Item component={Link} to="/dev">
                Developer
              </Menu.Item>
            </>
          ) : null}
          <Menu.Divider />
          <Menu.Item component={Link} to={`/settings`}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => logout()}>Sign out</Menu.Item>
        </Menu.Dropdown>
      ) : null}
    </Menu>
  )
}
