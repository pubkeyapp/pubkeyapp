import { Anchor, Badge, Card, Container, createStyles, Group, SimpleGrid, Text, Title } from '@mantine/core'
import React, { ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]}`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}))

export function HomepageSectionBuiltWith({
  data,
}: {
  data: { link: string; icon: ReactNode; title: string; description: ReactNode }[]
}) {
  const { classes, theme } = useStyles()
  const features = data.map((feature) => (
    <Card key={feature.title} shadow="md" className={classes.card} p="xl">
      {feature.icon}
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>

      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        Visit{' '}
        <Anchor href={feature.link} target={'_blank'}>
          {feature.link.replace('https://', '')}
        </Anchor>{' '}
        to learn more.
      </Text>
    </Card>
  ))
  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Built on the shoulders of giants
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        Powered by These Cutting-Edge Technologies
      </Title>

      <Text color="dimmed" className={classes.description} align="center" mt="md">
        At PubKey, we're proud to say that we've built our decentralized social network on the latest and greatest
        technologies. These are the powerful tools and platforms we've used to develop and run our platform, ensuring
        the best possible experience for our users.{' '}
      </Text>

      <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  )
}
