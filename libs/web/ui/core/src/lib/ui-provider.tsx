import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  DEFAULT_THEME,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, ReactNode, Suspense, useContext } from 'react'
import { UiLoader } from './ui-loader'

export interface UiProviderContext {
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

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

export function UiProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const value: UiProviderContext = {
    colorScheme,
    toggleColorScheme,
  }
  return (
    <Context.Provider value={value}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            ...DefaultUiTheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <Notifications zIndex={10} />
            <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export const useUi = () => useContext(Context)
