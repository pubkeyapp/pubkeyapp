import { Accordion, Box, Container, createStyles, rem, Title } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    minHeight: 650,
  },

  title: {
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },

  item: {
    borderRadius: theme.radius.xl,
    marginBottom: theme.spacing.lg,
    border: `${rem(4)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}))

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export function VerifiedSectionFaq({ data }: { data: FaqItem[] }) {
  const { classes } = useStyles()
  return (
    <Box>
      <Container size="sm" className={classes.wrapper}>
        <Title align="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          {data.map((item) => (
            <Accordion.Item className={classes.item} value={item.id} key={item.id}>
              <Accordion.Control>{item.question}</Accordion.Control>
              <Accordion.Panel>{item.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  )
}
