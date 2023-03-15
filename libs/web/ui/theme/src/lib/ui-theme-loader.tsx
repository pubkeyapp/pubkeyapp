import { Flex, Loader } from '@mantine/core'
import { MantineNumberSize, MantineTheme } from '@mantine/styles'

export function UiThemeLoader({
  size = 'xl',
  variant = 'oval',
  type = 'inline',
}: {
  size?: MantineNumberSize
  variant?: MantineTheme['loader']
  type?: 'full' | 'inline'
}) {
  return (
    <Flex h={type === 'full' ? '100vh' : '100%'} justify="center" align="center">
      <Loader size={size} variant={variant} />
    </Flex>
  )
}
