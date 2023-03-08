import { createStyles, Paper, SimpleGrid, Text } from '@mantine/core'
import { ComponentType } from 'react'
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

const linkColors = ['violet', 'indigo', 'blue', 'green', 'teal', 'cyan', 'pink', 'red', 'orange']

export function getColorByIndex(index: number) {
  return linkColors[index % linkColors.length]
}

export interface UiDashboardItem {
  icon: ComponentType<{ color?: string; size: number }>
  label: string
  link: string
  color?: string
}

export function UiDashboard({ links }: { links: UiDashboardItem[] }) {
  const { classes, theme } = useStyles()

  const items = links.map((item, index) => (
    <Paper key={item.label} component={Link} to={item.link} className={classes.item}>
      <item.icon color={theme.colors[getColorByIndex(index)][6]} size={64} />
      <Text size="lg" mt={7}>
        {item.label}
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
