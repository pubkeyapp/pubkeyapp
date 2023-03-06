import { Card, createStyles, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { ComponentType } from 'react'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 180,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}))

const linkColors = ['violet', 'indigo', 'blue', 'green', 'teal', 'cyan', 'pink', 'red', 'orange']

function getColorByIndex(index: number) {
  return linkColors[index % linkColors.length]
}

export interface UiDashboardItem {
  icon: ComponentType<{ color: string; size: number }>
  label: string
  link: string
}

export function UiDashboardGrid({ links }: { links: UiDashboardItem[] }) {
  const { classes, theme } = useStyles()

  const items = links.map((item, index) => (
    <UnstyledButton key={item.label} component={Link} to={item.link} className={classes.item}>
      <item.icon color={theme.colors[getColorByIndex(index)][6]} size={64} />
      <Text size="lg" mt={7}>
        {item.label}
      </Text>
    </UnstyledButton>
  ))

  return <SimpleGrid cols={3}>{items}</SimpleGrid>
}

export function UiDashboard({ links }: { links: UiDashboardItem[] }) {
  const { classes } = useStyles()

  return (
    <Card withBorder radius="md" className={classes.card}>
      <UiDashboardGrid links={links} />
    </Card>
  )
}
