import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import React from 'react'

export const useStyles = createStyles((theme) => ({
  root: {
    height: '100%',
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function GatewayNotFound({ app }: { app: string }) {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <Flex direction="column" justify="space-between" h="100%">
        <Box>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>You have found a secret place.</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to
            another URL.
          </Text>
          <Group position="center" pt="xl">
            <Button size="lg" component="a" href={app}>
              Create your page on PubKey
            </Button>
          </Group>
        </Box>
        <Stack>
          <Center>
            <Anchor component="a" href={app}>
              <PubKeyLogo size={32} />
            </Anchor>
          </Center>
        </Stack>
      </Flex>
    </Container>
  )
}
