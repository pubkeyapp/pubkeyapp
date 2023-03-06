import { Box, ColorScheme, ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { createContext, ReactNode, useContext } from 'react'
import { defaultTheme, largeTheme } from './ui-themes'

export interface UiTheme {
  theme?: MantineThemeOverride
}

export type UiThemeName = 'pink' | 'grape' | 'violet' | 'indigo' | 'blue'

export const APP_PRESET: Record<UiThemeName, UiTheme> = {
  blue: { theme: { ...largeTheme('blue') } },
  indigo: { theme: { ...defaultTheme('indigo') } },
  violet: { theme: { ...largeTheme('violet') } },
  grape: { theme: { ...defaultTheme('grape') } },
  pink: { theme: { ...largeTheme('pink') } },
}

export interface UiProviderContext {
  uiTheme: UiThemeName
  setUiTheme: (uiTheme: UiThemeName) => void
  colorScheme: ColorScheme
  toggleColorScheme: (colorScheme?: ColorScheme) => void
}

const Context = createContext<UiProviderContext>({} as UiProviderContext)

export function UiProvider({ children }: { children: ReactNode }) {
  const [uiTheme, setUiTheme] = useLocalStorage<UiThemeName>({
    key: 'mantine-ui-theme',
    defaultValue: 'blue',
    getInitialValueInEffect: true,
  })
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
    uiTheme,
    setUiTheme,
  }
  return (
    <Context.Provider value={value}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme, ...APP_PRESET[uiTheme].theme }} withGlobalStyles withNormalizeCSS>
          <ModalsProvider>
            <Notifications zIndex={10} />
            <Box>{children}</Box>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export const useUi = () => useContext(Context)
