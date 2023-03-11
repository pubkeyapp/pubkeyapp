import { Anchor, createStyles, Flex, Group, Header } from '@mantine/core'
import { WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { useAuth } from '@pubkeyapp/web/auth/data-access'
import { ComponentType, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UiHeaderProfile } from './ui-header-profile'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export type UiLinkGroup = { title: string; links: UiLinks }[]

export type UiLinks = UiLink[]
export interface UiLink {
  icon?: ComponentType<{ size: number }>
  link: string
  label: string
}

interface UiHeaderProps {
  links: UiLinks
  logo: ReactNode
}

export function UiHeader({ links, logo }: UiHeaderProps) {
  const { classes, cx } = useStyles()
  const { user } = useAuth()
  const location = useLocation()
  const activeLink = links.find((item) => item.link === location.pathname)?.link

  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.link,
      })}
    >
      <Group align="center" spacing={4}>
        {link.icon && <link.icon size={16} />}
        {link.label}
      </Group>
    </Anchor>
  ))

  return (
    <Header height={60}>
      <Flex className={classes.header}>
        <Group spacing={2}>
          <Anchor component={Link} to={user ? '/dashboard' : '/'} className={classes.logoLink}>
            {logo}
          </Anchor>
        </Group>
        <Group spacing={5}>{items}</Group>
        <Group>
          <WalletMultiButton size="sm" sx={{ border: 0 }} />
          <UiHeaderProfile />
        </Group>
      </Flex>
    </Header>
  )
}
