import { createStyles, Navbar, ScrollArea } from '@mantine/core'
import { UiNavbarLinkGroup, UiNavbarLinkGroupProps } from './ui-navbar-links-group'

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}))

export function UiNavbar({ hidden, links }: { hidden: boolean; links: UiNavbarLinkGroupProps[] }) {
  const { classes } = useStyles()
  const navLinks = links.map((item) => <UiNavbarLinkGroup {...item} key={item.label} />)

  return (
    <Navbar width={{ sm: 300 }} px="md" className={classes.navbar} hidden={hidden}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{navLinks}</div>
      </Navbar.Section>
    </Navbar>
  )
}
