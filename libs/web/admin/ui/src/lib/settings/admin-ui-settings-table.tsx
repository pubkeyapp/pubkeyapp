import { Accordion, Button, createStyles, Group, Stack, Text, TextInput } from '@mantine/core'
import { Setting } from '@pubkeyapp/web/util/sdk'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

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
export function AdminUiSettingsTable({
  settings,
  setSettings,
}: {
  settings: Setting[]
  setSettings: (key: string, value: string) => Promise<void>
}) {
  const { classes } = useStyles()

  return (
    <Accordion mx="auto" variant="filled" defaultValue={settings[0].key} classNames={classes} className={classes.root}>
      {settings.map((setting) => {
        return (
          <Accordion.Item value={setting.key!} key={setting.key}>
            <Accordion.Control>
              <Group noWrap>
                <div>
                  <Text ff="monospace">{setting.key}</Text>
                  <Text size="sm" color="dimmed" weight={400}>
                    <ReactMarkdown>{setting.description ?? ''}</ReactMarkdown>
                  </Text>
                </div>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <SettingsPanelLabel setting={setting} setSettings={setSettings} />
            </Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

function SettingsPanelLabel({
  setting,
  setSettings,
}: {
  setting: Setting
  setSettings: (key: string, value: string) => Promise<void>
}) {
  const [value, setValue] = useState(setting.value ?? '')

  return (
    <Stack p="xl">
      <TextInput value={`${setting.default}`} label="Default Value" readOnly />
      <TextInput value={value} label="Value" onChange={(event) => setValue(event.currentTarget.value)} />
      <Group position="center" onClick={() => setSettings(setting.key!, value)}>
        <Button>Save</Button>
      </Group>
    </Stack>
  )
}
