import { Anchor, createStyles, Flex, Footer, Group } from '@mantine/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UiLinks } from './ui-header'

const useStyles = createStyles((theme) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inner: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
}))

interface UiFooterProps {
  links: UiLinks
  logo: ReactNode
}

export function UiFooter({ links, logo }: UiFooterProps) {
  const { classes } = useStyles()
  const items = links.map((link) => (
    <Anchor<'a'> color="dimmed" key={link.label} href={link.link} target="_blank" size="sm">
      <Group align="center" spacing={4}>
        {link.icon && <link.icon size={16} />}
        {link.label}
      </Group>
    </Anchor>
  ))

  return (
    <Footer height={60} className={classes.footer} zIndex={1}>
      <Flex className={classes.inner}>
        <Anchor component={Link} to="/" className={classes.logoLink}>
          {logo}
        </Anchor>
        <Group>{items}</Group>
      </Flex>
    </Footer>
  )
}
