import { Button, Menu, useMantineTheme } from '@mantine/core'
import React from 'react'
import { PageColorSelectItem } from './page-color-select-item'

export function PageColorSelect({
  colors,
  selected,
  selectColor,
  title = 'Select Color',
}: {
  colors?: string[]
  selected: string
  selectColor: (color: string) => void
  title?: string
}) {
  const theme = useMantineTheme()
  colors = colors ?? Object.keys(theme.colors)

  return (
    <Menu styles={{ dropdown: { zIndex: 10000 } }}>
      <Menu.Target>
        <Button>{title}</Button>
      </Menu.Target>
      <Menu.Dropdown>
        {colors.map((color) => (
          <PageColorSelectItem color={color} selected={selected} selectColor={selectColor} key={color} />
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
