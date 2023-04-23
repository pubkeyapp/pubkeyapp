import { createStyles, Card, Image, Text, Group, RingProgress, rem, SimpleGrid } from '@mantine/core'
import { UiDebugModal } from '@pubkeyapp/web/ui/core'
import { Mint } from '@pubkeyapp/web/util/sdk'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}))

export function MintCard({ mint }: { mint: Mint }) {
  const { classes } = useStyles()
  const attributes: { value: string; trait_type: string }[] = mint.metadata?.attributes || []
  const title = mint.metadata?.name || 'Unknown'
  const image = mint.metadata?.image || 'https://via.placeholder.com/150'

  const items = attributes.map((stat) => (
    <div key={stat.trait_type}>
      <Text size="xs" color="dimmed">
        {stat.trait_type}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ))

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} />
      </Card.Section>

      <Group position="apart" my="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {title}
        </Text>
        <UiDebugModal data={mint} />
      </Group>
      <Card.Section className={classes.footer}>
        <SimpleGrid cols={3}>{items}</SimpleGrid>
      </Card.Section>
    </Card>
  )
}
