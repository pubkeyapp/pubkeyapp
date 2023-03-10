import { createStyles, Card, Image, Text, Group, RingProgress, rem } from '@mantine/core'
import { getAvatarUrl } from '@pubkeyapp/web/ui/core'
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
  const data = {
    uri: 'https://bafybeiaxo6iyhs32qs4fxvk3ahmkzehnisetcfxqa7el57c55gv3i5vyua.ipfs.nftstorage.link/',
    json: null,
    name: 'Checks – Solana Edition',
    uses: null,
    model: 'metadata',
    symbol: '',
    address: '4SX49yN1JQJSkVUb4cDDazVpsvtbz63gHxuRXfgGT93C',
    creators: [
      {
        share: 100,
        address: 'MCxoVK4HBj1YukpKhSFQ2itsRgh34tRsBgRPnWt3rp1',
        verified: true,
      },
    ],
    isMutable: false,
    collection: {
      key: '6KJd5T4ekHTxeiUnyLwpp1MqdN6gksRrNWwB76Bd1pFe',
      address: '6KJd5T4ekHTxeiUnyLwpp1MqdN6gksRrNWwB76Bd1pFe',
      verified: true,
    },
    jsonLoaded: false,
    mintAddress: 'H4XdujpVS2D1gympSzJRUfkJJLC4WguzCkDautdF1aey',
    editionNonce: 252,
    tokenStandard: 3,
    collectionDetails: null,
    programmableConfig: null,
    primarySaleHappened: true,
    sellerFeeBasisPoints: 420,
    updateAuthorityAddress: 'Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7',
  }
  const items = [{ title: 'title', value: 'value' }]?.map((stat) => (
    <div key={stat.title}>
      <Text size="xs" color="dimmed">
        {stat.title}
      </Text>
      <Text weight={500} size="sm">
        {stat.value}
      </Text>
    </div>
  ))

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Card.Section>
        <Image src={avatarUrl} alt={title} height={800} />
      </Card.Section>

      <Group position="apart" mt="xl">
        <Text fz="sm" fw={700} className={classes.title}>
          {data.name}
        </Text>
        <Group spacing={5}>
          <Text fz="xs" c="dimmed">
            80% completed
          </Text>
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {/*{data.description}*/}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  )
}
