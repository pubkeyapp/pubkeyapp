import { ActionIcon, createStyles, Group, rem } from '@mantine/core'
import { useUiTheme } from '@pubkeyapp/web/ui/theme'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter, IconMoonStars, IconSun } from '@tabler/icons-react'
import { ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}))

interface FooterCenteredProps {
  copyright: string
  logo: ReactNode
}

export function UiAppFooter({ logo, copyright }: FooterCenteredProps) {
  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useUiTheme()

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        {logo}

        <Group className={classes.links}>{copyright}</Group>

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
      </div>
    </div>
  )
}
