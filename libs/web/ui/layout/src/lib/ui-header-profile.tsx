import { Avatar, Badge, Box, createStyles, Group, Menu, rem, Text, UnstyledButton } from '@mantine/core'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { UserRole } from '@pubkeyapp/web/util/sdk'
import { IconChevronDown, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    color: theme.colorScheme === 'dark' ? theme.colors.brand[3] : theme.colors.brand[6],
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 4,
    borderRadius: theme.radius.xl,
    transition: 'background-color 100ms ease',
  },
  buttonActive: {},
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
      offset={3}
      arrowOffset={12}
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.button, { [classes.buttonActive]: userMenuOpened })} disabled={!user}>
          <Group spacing={3} pr={4}>
            {user?.avatarUrl ? (
              <Avatar src={user?.avatarUrl} alt={`Avatar of ${user?.name}`} radius="xl" size={30} />
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
            <Box w={230}>
              <Group position="apart" noWrap>
                <Text truncate>
                  <Group spacing={4} noWrap pb={2}>
                    <Text truncate weight={'bold'} size="sm" sx={{ lineHeight: 1 }} lineClamp={1}>
                      {user.name}
                    </Text>
                  </Group>
                </Text>
                {user?.role === UserRole.Admin ? <Badge miw={80}>{user.role}</Badge> : null}
              </Group>
            </Box>
          </Menu.Label>
          <Menu.Divider />

          <Menu.Item component={Link} to="/dashboard">
            Dashboard
          </Menu.Item>
          <Menu.Item component={Link} to={`${user.profileUrl}`}>
            Your Profile
          </Menu.Item>
          {user.role === UserRole.Admin ? (
            <>
              <Menu.Divider />
              <Menu.Item component={Link} to="/admin">
                Admin Dashboard
              </Menu.Item>
              {/*<Menu.Item component={Link} to="/dev">*/}
              {/*  Developer*/}
              {/*</Menu.Item>*/}
            </>
          ) : null}
          <Menu.Divider />
          <Menu.Item component={Link} to="/settings">
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => logout()}>Sign out</Menu.Item>
        </Menu.Dropdown>
      ) : null}
    </Menu>
  )
}
