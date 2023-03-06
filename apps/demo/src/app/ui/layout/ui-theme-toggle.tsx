import { ActionIcon, Group, useMantineTheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { useUi } from '../ui-provider'

export function UiThemeToggle() {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useUi()
  const defaultProps = theme?.components?.Button?.defaultProps
  const { radius } = defaultProps || {}

  return (
    <Group position="center" my="xl">
      <ActionIcon
        radius={radius || 'xs'}
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.brand[3] : theme.colors.brand[6],
        })}
      >
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    </Group>
  )
}
