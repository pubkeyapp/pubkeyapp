import { createStyles, Card, Image, Text, Group, RingProgress, rem, SimpleGrid } from '@mantine/core'
import { getAvatarUrl, UiDebug } from '@pubkeyapp/web/ui/core'
import { Account } from '@pubkeyapp/web/util/sdk'

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

export function AccountTypeCardMetaplexNft({ account }: { account: Account }) {
  const { classes } = useStyles()
  const avatarUrl =
    account.metadata?.fetched?.image ?? account.metadata?.fetched?.image ?? getAvatarUrl(`${account.address}`)
  const title = account.metadata?.fetched?.name ?? account.metadata?.name ?? account.address
  const description = account?.metadata?.fetched?.description ?? account?.metadata?.description ?? ''
  const attributes = account?.metadata?.fetched?.attributes ?? []
  const items = attributes?.map((stat: { trait_type: string; value: string }) => (
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
    <Card withBorder padding="lg" className={classes.card} maw={500} mx="auto">
      <Image src={avatarUrl} alt={title} height={300} fit="contain" />
      <Group position="apart" mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {account.metadata.name ?? account.metadata.fetched?.name ?? account.address}
        </Text>
        <Group spacing={5}>
          <Text fz="xs" c="dimmed"></Text>
        </Group>
      </Group>
      {/*<UiDebug data={account} />*/}
      {description ? (
        <Text mt="sm" mb="md" c="dimmed" fz="xs" maw={300}>
          {description}
        </Text>
      ) : null}
      {items?.length ? (
        <Card.Section className={classes.footer}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            {items}
          </SimpleGrid>
        </Card.Section>
      ) : null}
    </Card>
  )
}
