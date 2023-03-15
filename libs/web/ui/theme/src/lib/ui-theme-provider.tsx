import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import React, { createContext, ReactNode, Suspense, useContext } from 'react'
import { DefaultUiTheme } from './default-ui-theme'
import { UiThemeLoader } from './ui-theme-loader'

export interface UiProviderContext {
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

export function UiThemeProvider({ children }: { children: ReactNode }) {
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
            <Suspense fallback={<UiThemeLoader type="full" />}>{children}</Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export const useUiTheme = () => useContext(Context)
