import { Card, createStyles, rem, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { App } from '@pubkeyapp/web/apps/data-access'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(172),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}))

export function AppDashboard({ apps }: { apps: App[] }) {
  const { classes } = useStyles()

  const items = apps.map((app, index) => (
    <UnstyledButton
      key={app.name}
      component={Link}
      to={`/apps/${app.id}/${app.itemId ? app.itemId : ''}`}
      className={classes.item}
    >
      {app.logo}
      <Text size="lg" mt={7}>
        {app.name}
      </Text>
    </UnstyledButton>
  ))

  return (
    <Card withBorder={false} radius="lg">
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
    </Card>
  )
}
