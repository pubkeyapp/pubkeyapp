import { Button, Group } from '@mantine/core'
import { APP_PRESET, UiThemeName, useUi } from '../ui-provider'

export function UiThemeColors() {
  const { setUiTheme } = useUi()

  return (
    <Group position="center" my="xl">
      {Object.keys(APP_PRESET).map((color) => (
        <Button key={color} onClick={() => setUiTheme(color as UiThemeName)} color={color} size="sm">
          {color}
        </Button>
      ))}
    </Group>
  )
}
