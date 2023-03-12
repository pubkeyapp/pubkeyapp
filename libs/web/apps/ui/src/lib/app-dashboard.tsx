import { createStyles, Paper, SimpleGrid, Text } from '@mantine/core'
import { App } from '@pubkeyapp/web/apps/data-access'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.xl,
    height: 180,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}))

export function AppDashboard({ apps }: { apps: App[] }) {
  const { classes } = useStyles()

  const items = apps.map((app, index) => (
    <Paper
      key={app.name}
      component={Link}
      to={`/apps/${app.id}/${app.itemId ? app.itemId : ''}`}
      className={classes.item}
    >
      {app.logo}
      <Text size="lg" mt={7}>
        {app.name}
      </Text>
    </Paper>
  ))

  return (
    <SimpleGrid
      cols={3}
      spacing="xl"
      breakpoints={[
        { maxWidth: '62rem', cols: 3, spacing: 'md' },
        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
      ]}
    >
      {items}
    </SimpleGrid>
  )
}
