import { Accordion, Button, createStyles, Group, Text } from '@mantine/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import React from 'react'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.xl,
  },

  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderRadius: theme.radius.xl,
    border: '4px solid transparent',
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      borderRadius: theme.radius.xl,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}))

export function WebPageEditorPublishTab({ page }: { page: Page }) {
  const { classes } = useStyles()

  const steps = [
    { id: 'step-1', title: 'Select domain', description: 'Coming Soon' },
    { id: 'step-2', title: 'Create Gum User', description: 'Coming Soon' },
    { id: 'step-3', title: 'Publish to Arweave', description: 'Coming Soon' },
    { id: 'step-4', title: 'Create Gum Profile', description: 'Coming Soon' },
  ]

  return (
    <Accordion mx="auto" variant="filled" defaultValue={steps[0].id} classNames={classes} className={classes.root}>
      {steps.map((step) => {
        return (
          <Accordion.Item value={step.id} key={step.id}>
            <Accordion.Control>
              <Group>
                <Text>{step.title}</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Group position="center">
                <Button disabled>{step.description}</Button>
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
