import { Anchor, Button, Center, Container, createStyles, Group, Header, Menu, rem } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { IconChevronDown } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
    borderRadius: '40px',
    padding: theme.spacing.md,
  },

  inner: {
    height: rem(56),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.white,
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1,
      ),
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}))

interface HeaderSearchProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[]
}

export function UiHomepageHeader({ links }: HeaderSearchProps) {
  const { classes } = useStyles()

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={Link} to={item.link}>
        {item.label}
      </Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal zIndex={2000}>
          <Menu.Target>
            <Anchor component={Link} to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Anchor component={Link} key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Anchor>
    )
  })

  return (
    <Header height={90} className={classes.header}>
      <Container size="xl">
        <div className={classes.inner}>
          <Anchor component={Link} to="/home" sx={{ display: 'flex' }}>
            <PubKeyLogo size={36} inverted />
          </Anchor>
          <Group spacing={5}>
            {items}
            <Button component={Link} to="/login" variant="default" ml="sm">
              Login
            </Button>
          </Group>
        </div>
      </Container>
    </Header>
  )
}
