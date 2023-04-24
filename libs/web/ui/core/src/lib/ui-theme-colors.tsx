import { DefaultMantineColor, Tuple } from '@mantine/core'

// Used to make the 'brand' color scheme available on the theme.colors object
// https://mantine.dev/theming/colors/#add-custom-colors-types
declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<UiThemeColors, Tuple<string, 10>>
  }
}

export type UiThemeColors = 'brand' | DefaultMantineColor
