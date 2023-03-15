import { DEFAULT_THEME, MantineThemeOverride } from '@mantine/core'

export const DefaultUiTheme: MantineThemeOverride = {
  colors: {
    brand: DEFAULT_THEME.colors.blue,
  },
  loader: 'dots',
  primaryColor: 'brand',
  components: {
    Accordion: {
      defaultProps: {
        color: 'brand',
        radius: 'xl',
      },
    },
    Alert: {
      defaultProps: {
        color: 'brand',
        radius: 'xl',
      },
    },
    Autocomplete: {
      defaultProps: {
        color: 'brand',
        size: 'lg',
      },
    },
    Button: {
      defaultProps: {
        color: 'brand',
        radius: 'xl',
        size: 'lg',
      },
    },
    Card: {
      defaultProps: {
        radius: 'xl',
        withBorder: true,
        style: {
          borderWidth: 4,
        },
      },
    },
    Checkbox: {
      defaultProps: {
        color: 'brand',
        size: 'lg',
      },
    },
    Chip: {
      defaultProps: {
        color: 'brand',
        size: 'xl',
      },
    },
    CloseButton: {
      defaultProps: {
        color: 'brand',
        size: 'lg',
      },
    },
    Loader: {
      defaultProps: {
        color: 'brand',
        size: 'lg',
      },
    },
    Paper: {
      defaultProps: {
        p: 'xl',
        radius: 'xl',
        withBorder: true,
        style: {
          borderWidth: 4,
        },
      },
    },
  },
}
