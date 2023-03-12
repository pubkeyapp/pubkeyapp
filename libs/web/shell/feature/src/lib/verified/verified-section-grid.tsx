import { Container, createStyles, rem, SimpleGrid, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core'
import { ComponentType, ReactNode } from 'react'

interface FeatureProps {
  icon: ComponentType<{ size: number; stroke: number }>
  title: ReactNode
  description: ReactNode
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  const theme = useMantineTheme()
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon size={20} stroke={1.5} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>{title}</Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  )
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(28),
      textAlign: 'left',
    },
  },

  description: {
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      textAlign: 'left',
    },
  },
}))

interface VerifiedFeatureGridProps {
  data: FeatureProps[]
  description: ReactNode
  title: ReactNode
}

export function VerifiedSectionGrid({ data, description, title }: VerifiedFeatureGridProps) {
  const { classes, theme } = useStyles()
  const features = data.map((feature, index) => <Feature {...feature} key={index} />)

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{title}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={3}
        // spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}
