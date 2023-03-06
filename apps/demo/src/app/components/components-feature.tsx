import {
  Accordion,
  Alert,
  Autocomplete,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CloseButton,
  Container,
  Group,
  Image,
  Loader,
  Paper,
  Stack,
  Text,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { MantineTheme } from '@mantine/styles'
import React from 'react'

export function ComponentsFeature() {
  return (
    <Container my="md">
      <Stack spacing="xl">
        <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
          TEST
        </Paper>
        <ButtonsDemo />
        <LoadersDemo />
        <Group position="center" align="start">
          <Accordion variant="default" defaultValue="customization" w={200}>
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or overwrite any part of
                component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="filled" defaultValue="customization" w={200}>
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or overwrite any part of
                component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="separated" defaultValue="customization" w={200}>
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or overwrite any part of
                component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
          <Accordion variant="contained" defaultValue="customization" w={200}>
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or overwrite any part of
                component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Group>
        <Group position="center">
          <Checkbox label="The default" />
          <Checkbox indeterminate label="The indeterminate" />
          <Checkbox indeterminate checked label="The indeterminate checked" />
          <Checkbox indeterminate checked disabled label="The indeterminate checked disabled" />
        </Group>
        <Group position="center">
          <Chip defaultChecked variant="filled">
            Awesome chip
          </Chip>
          <Chip defaultChecked variant="subtle">
            Awesome chip
          </Chip>
          <Chip defaultChecked variant="outline">
            Awesome chip
          </Chip>
          <Chip defaultChecked variant="light">
            Awesome chip
          </Chip>
        </Group>
        <Group position="center">
          <Autocomplete label="Pick framework" placeholder="Pick one" data={['React', 'Angular', 'Svelte', 'Vue']} />
          <Autocomplete
            variant="filled"
            label="Pick framework"
            placeholder="Pick one"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
          <Autocomplete
            variant="outline"
            label="Pick framework"
            placeholder="Pick one"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
          <Autocomplete
            variant="unstyled"
            label="Pick framework"
            placeholder="Pick one"
            data={['React', 'Angular', 'Svelte', 'Vue']}
          />
        </Group>
        <Group position="center">
          <CloseButton variant="filled" />
          <CloseButton variant="subtle" />
          <CloseButton variant="outline" />
          <CloseButton variant="light" />
        </Group>
        <Group position="center">
          <Alert variant="filled">This is a filled alert</Alert>
          <Alert variant="subtle">This is a subtle alert</Alert>
          <Alert variant="outline">This is a outline alert</Alert>
          <Alert variant="light">This is a light alert</Alert>
        </Group>
        <Group position="center">
          <Paper w={400}>
            <Stack>
              <Group position="apart">
                <Text weight={500}>Norway Fjord Adventures</Text>
                <Badge color="pink" variant="light">
                  On Sale
                </Badge>
              </Group>

              <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
                around the fjords of Norway
              </Text>

              <Button variant="light" color="blue" fullWidth>
                Book classic tour now
              </Button>
            </Stack>
          </Paper>
        </Group>
        <Group position="center">
          <Card w={400} sx={{ borderWidth: 40 }}>
            <Card.Section>
              <Image
                src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                height={160}
                alt="Image"
              />
            </Card.Section>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>Norway Fjord Adventures</Text>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and
              around the fjords of Norway
            </Text>

            <Button variant="light" color="blue" fullWidth mt="md">
              Book classic tour now
            </Button>
          </Card>
        </Group>
      </Stack>
    </Container>
  )
}

function ButtonsDemo() {
  const variants = ['filled', 'subtle', 'outline', 'light'] as const

  return (
    <Group position="center">
      {variants.map((variant, index) => (
        <Button
          key={variant || index}
          variant={variant}
          onClick={() =>
            notifications.show({
              title: 'Notification',
              message: `You clicked the ${variant} button!`,
              color: 'brand',
            })
          }
        >
          {variant}
        </Button>
      ))}
    </Group>
  )
}

function LoadersDemo() {
  return (
    <Group position="center">
      {['bars', 'oval', 'dots'].map((variant) => (
        <Box key={variant}>
          <Loader color="brand" variant={variant as MantineTheme['loader']} />
        </Box>
      ))}
    </Group>
  )
}
