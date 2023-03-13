import { Accordion, Button, Group, Text } from '@mantine/core'
import { useAccordionStyles } from '@pubkeyapp/web/ui/core'
import { Page } from '@pubkeyapp/web/util/sdk'
import React from 'react'

export function WebPageEditorPublishTab({ page }: { page: Page }) {
  const { classes } = useAccordionStyles()

  const steps = [
    { id: 'step-1', title: 'Confirm page', description: 'Coming Soon' },
    { id: 'step-2', title: 'Publish to Arweave', description: 'Coming Soon' },
    { id: 'step-3', title: 'Create Gum Profile Metadata', description: 'Coming Soon' },
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
