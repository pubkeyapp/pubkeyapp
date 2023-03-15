import { CheckIcon, ColorSwatch, Menu, Text, useMantineTheme } from '@mantine/core'

export function PageColorSelectItem({
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
    <Menu.Item
      key={color}
      icon={
        <ColorSwatch color={theme.colors[color][6]}>{selected === color ? <CheckIcon width={10} /> : ''}</ColorSwatch>
      }
      onClick={() => selectColor?.(color)}
    >
      <Text fw={selected === color ? 'bold' : undefined}>{color}</Text>
    </Menu.Item>
  )
}
