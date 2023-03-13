import { AspectRatio, Card, Container, createStyles, Group, Image, SimpleGrid, Text } from '@mantine/core'
import { UiActionIcon } from '@pubkeyapp/web/ui/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontWeight: 600,
  },
}))

export function GumPostGrid({
  loading,
  posts,
  deletePost,
}: {
  loading: boolean
  deletePost: (cl_pubkey: string) => void
  posts: {
    cl_pubkey: string
    profile: string
    metadatauri: string
    metadata: { data: { title: string; slug: string; image_url: string; description: string } }
  }[]
}) {
  const { classes } = useStyles()

  const cards = posts.map((post) => (
    <Card key={post.cl_pubkey} p="md" radius="md" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={post.metadata.data.image_url} />
      </AspectRatio>
      <Text className={classes.title} mt="md">
        {post.metadata.data.title}
      </Text>
      <Text color="dimmed" mt={5}>
        {post.metadata.data.description}
      </Text>
      <Group position="right">
        <UiActionIcon
          size="xl"
          iconSize={24}
          loading={loading}
          label={'Delete Post'}
          icon={IconTrash}
          onClick={() => deletePost(post.cl_pubkey!)}
        />
      </Group>
    </Card>
  ))

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  )
}
