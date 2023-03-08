import { ActionIcon, useMantineTheme } from '@mantine/core'
import { useUiTheme } from '@pubkeyapp/web/ui/theme'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export function UiThemeToggle() {
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useUiTheme()
  const defaultProps = theme?.components?.Button?.defaultProps
  const { radius } = defaultProps || {}

  return (
    <ActionIcon
      radius={radius || 'xs'}
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        [theme.fn.smallerThan('xs')]: {
          display: 'none',
        },
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.brand[3] : theme.colors.brand[6],
      })}
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  )
}
