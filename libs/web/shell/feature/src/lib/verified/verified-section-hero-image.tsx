import { Button, Container, createStyles, rem, Text, Title } from '@mantine/core'
import { PubKeyLogo } from '@pubkeyapp/logo'

import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const image0 =
  'https://images.unsplash.com/photo-1618843338300-944099d1f728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
const image1 =
  'https://images.unsplash.com/photo-1607857519715-9e94e187f5a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
const image2 =
  'https://images.unsplash.com/photo-1542234744-fd8c28796e8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#2F1E62',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #2F1E62 70%), url(${image1})`,
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}))

export function VerifiedSectionHeroImage({
  cta,
  description,
  title,
}: {
  cta: ReactNode
  description: ReactNode
  title: ReactNode
}) {
  const { classes } = useStyles()
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <PubKeyLogo size={72} />
            <Title className={classes.title}>{title}</Title>
            <Text className={classes.description} mt={30}>
              {description}
            </Text>
            <Button
              component={Link}
              to="/dashboard"
              variant="filled"
              color="pink"
              size="xl"
              className={classes.control}
              mt={40}
            >
              {cta}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
