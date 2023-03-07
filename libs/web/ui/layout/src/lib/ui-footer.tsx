import { ActionIcon, Container, createStyles, Group, rem, Text } from '@mantine/core'
import { useUiTheme } from '@pubkeyapp/web/ui/theme'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter, IconMoonStars, IconSun } from '@tabler/icons-react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UiLinks } from './ui-header'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(32),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

interface UiFooterProps {
  description: string
  copyright: string
  links: { title: string; links: UiLinks }[]
  logo: ReactNode
}

export function UiFooter({ copyright, description, links, logo }: UiFooterProps) {
  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useUiTheme()
  const groups = links.map((group) => {
    const links = group.links.map((link, index) => {
      if (link.link.startsWith('http')) {
        return (
          <Text<'a'> key={index} className={classes.link} component="a" href={link.link} target="_blank">
            {link.label}
          </Text>
        )
      }
      return (
        <Text key={index} className={classes.link} component={Link} to={link.link}>
          {link.label}
        </Text>
      )
    })

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    )
  })

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="xl">
        <div className={classes.logo}>
          {logo}
          <Text size="xs" color="dimmed" className={classes.description}>
            {description}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter} size="xl">
        <Text color="dimmed" size="sm">
          {copyright}
        </Text>
        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon component="a" href="https://github.com/pubkeyapp/pubkeyapp" size="lg">
            <IconBrandGithub size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href="https://twitter.com/PubKeyApp" size="lg">
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href="https://pubkey.app/join-discord" size="lg">
            <IconBrandDiscord size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? (
              <IconSun size="1.05rem" stroke={1.5} />
            ) : (
              <IconMoonStars size="1.05rem" stroke={1.5} />
            )}
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  )
}
