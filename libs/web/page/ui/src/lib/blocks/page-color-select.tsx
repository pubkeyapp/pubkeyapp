import { Button, CheckIcon, SimpleGrid, Stack, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

export function PageColorSelect({
  colors,
  selected,
  selectColor,
}: {
  colors?: string[]
  selected: string
  selectColor: (color: string) => void
}) {
  const theme = useMantineTheme()
  colors = colors ?? Object.keys(theme.colors)

  return (
    <Stack>
      <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {colors.map((color) => (
          <PageColorGridItem color={color} selected={selected} selectColor={selectColor} key={color} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
export function PageColorGridItem({
  color,
  selected,
  selectColor,
}: {
  color: string
  selected: string
  selectColor: (color: string) => void
}) {
  const theme = useMantineTheme()

  return (
    <Button
      size="sm"
      key={color}
      color={color}
      leftIcon={selected === color ? <CheckIcon width={20} /> : null}
      onClick={() => selectColor?.(color)}
    >
      <Text color={theme.colors[color][1]} fw={selected === color ? 'bold' : undefined}>
        {color}
      </Text>
    </Button>
  )
}
