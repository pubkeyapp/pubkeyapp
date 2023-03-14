import { IdentityAddModal } from '@pubkeyapp/web/identity/ui'
import React from 'react'
import { Button, ColorScheme, ColorSchemeProvider, MantineProvider, Text } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { ContextModalProps, ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { DefaultUiTheme } from '@pubkeyapp/web/ui/theme'
import { createContext, ReactNode, Suspense, useContext } from 'react'
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
          <ModalsProvider modals={{ demonstration: TestModal, identityAdd: IdentityAddModal }}>
            <Notifications zIndex={10} />
            <Suspense fallback={<UiThemeLoader type="full" />}>{children}</Suspense>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Context.Provider>
  )
}

export const useUiTheme = () => useContext(Context)

const TestModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
)
