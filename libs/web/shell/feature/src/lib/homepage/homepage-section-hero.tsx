import { Box, Button, Container, createStyles, Group, rem, Stack, Text } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { IconBrandGithub } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  wrapper: {
    // position: 'relative',
    // boxSizing: 'border-box',
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(32),
    paddingBottom: rem(120),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}))

export function HomepageSectionHero() {
  const { classes } = useStyles()

  return (
    <div className={classes.wrapper + ''}>
      <Container className={classes.inner}>
        <Stack spacing={36}>
          <Box>
            <PubKeyLogo size={48} />
          </Box>
          <h1 className={classes.title}>
            A{' '}
            <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
              Social Network
            </Text>
            .
          </h1>
          <h1 className={classes.title}>Built on Solana.</h1>
        </Stack>

        {/*<Text className={classes.description} color="dimmed">*/}
        {/*  Build fully functional accessible web applications with ease – Mantine includes more than 100 customizable*/}
        {/*  components and hooks to cover you in any situation*/}
        {/*</Text>*/}

        <Group className={classes.controls}>
          <Button
            component={Link}
            to="/login"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get early access
          </Button>

          {/*<Button*/}
          {/*  component="a"*/}
          {/*  href="https://github.com/mantinedev/mantine"*/}
          {/*  size="xl"*/}
          {/*  variant="default"*/}
          {/*  className={classes.control}*/}
          {/*  leftIcon={<IconBrandGithub size={20} />}*/}
          {/*>*/}
          {/*  GitHub*/}
          {/*</Button>*/}
        </Group>
      </Container>
    </div>
  )
}
