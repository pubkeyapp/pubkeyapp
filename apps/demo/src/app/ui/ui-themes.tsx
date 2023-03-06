import {
  AccordionProps,
  AlertProps,
  AutocompleteProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  ChipProps,
  CloseButtonProps,
  DEFAULT_THEME,
  LoaderProps,
  MantineThemeOverride,
  PaperProps,
  rem,
} from '@mantine/core'
import { MantineThemeComponents } from '@mantine/styles/lib/theme/types/MantineTheme'
import { UiThemeColors } from './ui-theme-colors'

export interface UiThemeProps {
  Accordion: Partial<AccordionProps>
  Alert: Partial<AlertProps>
  Autocomplete: Partial<AutocompleteProps>
  Button: Partial<ButtonProps>
  Card: Partial<CardProps>
  Checkbox: Partial<CheckboxProps>
  Chip: Partial<ChipProps>
  CloseButton: Partial<CloseButtonProps>
  Loader: Partial<LoaderProps>
  Paper: Partial<PaperProps>
}

function createThemeComponents(theme: UiThemeProps): MantineThemeComponents {
  return {
    Accordion: { defaultProps: theme.Accordion },
    Alert: { defaultProps: theme.Alert },
    Autocomplete: { defaultProps: theme.Autocomplete },
    Button: { defaultProps: theme.Button },
    Card: { defaultProps: theme.Card },
    Checkbox: { defaultProps: theme.Checkbox },
    Chip: { defaultProps: theme.Chip },
    CloseButton: { defaultProps: theme.CloseButton },
    Loader: { defaultProps: theme.Loader },
    Paper: { defaultProps: theme.Paper },
  }
}

export const DefaultThemeProps: UiThemeProps = {
  Accordion: {
    color: 'brand',
  },
  Alert: {
    color: 'brand',
  },
  Autocomplete: {
    color: 'brand',
  },
  Button: {
    color: 'brand',
  },
  Card: {},
  Checkbox: {
    color: 'brand',
  },
  Chip: {
    color: 'brand',
  },
  CloseButton: {
    color: 'brand',
  },
  Loader: {
    color: 'brand',
  },
  Paper: {},
}

export const LargeThemeProps: UiThemeProps = {
  Accordion: {
    ...DefaultThemeProps.Accordion,
    radius: 'xl',
  },
  Alert: {
    ...DefaultThemeProps.Alert,
    radius: 'xl',
  },
  Autocomplete: {
    ...DefaultThemeProps.Autocomplete,
    size: 'lg',
  },
  Button: {
    ...DefaultThemeProps.Button,
    radius: 'xl',
    size: 'lg',
  },
  Card: {
    ...DefaultThemeProps.Card,
    radius: 'xl',
    withBorder: true,
    sx: {
      borderWidth: 4,
    },
  },
  Checkbox: {
    ...DefaultThemeProps.Checkbox,
    size: 'lg',
  },
  Chip: {
    ...DefaultThemeProps.Chip,
    size: 'xl',
  },
  CloseButton: {
    ...DefaultThemeProps.CloseButton,
    size: 'lg',
  },
  Loader: {
    ...DefaultThemeProps.Loader,
    size: 'lg',
  },
  Paper: {
    ...DefaultThemeProps.Paper,
    p: 'xl',
    radius: 'xl',
    withBorder: true,
    sx: {
      '&[data-with-border]': {
        borderWidth: rem(4),
      },
    },
  },
}

export function defaultTheme(color: UiThemeColors): MantineThemeOverride {
  return {
    colors: {
      brand: DEFAULT_THEME.colors[color],
    },
    loader: 'dots',
    primaryColor: 'brand',
    components: createThemeComponents(DefaultThemeProps),
  }
}

export function largeTheme(color: UiThemeColors): MantineThemeOverride {
  return {
    ...defaultTheme(color),
    ...{
      components: createThemeComponents(LargeThemeProps),
    },
  }
}
