import { Flex, Loader } from '@mantine/core'

export function UiLoader() {
  return (
    <Flex h="100%" justify="center" align="center">
      <Loader size="xl" />
    </Flex>
  )
}
