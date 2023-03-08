import { Box, rem, Tabs, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

export interface UiTabRoute {
  component: ReactNode
  label: string
  value: string
}

export function UiTabRoutes({ tabs }: { tabs: UiTabRoute[] }) {
  const navigate = useNavigate()
  const location = useLocation()
  // Set the active tab based on matching the location pathname with the tab value
  const activeTab = tabs.find((tab) => location.pathname.endsWith(tab.value))?.value
  // Set default redirect route to the first tab
  const redirect = tabs.length && tabs[0].value !== '' ? tabs[0].value : undefined

  return (
    <Box>
      <Tabs
        value={activeTab}
        onTabChange={(value) => navigate(`${value}`)}
        variant="pills"
        radius="xl"
        mb="xl"
        styles={(theme) => {
          return {
            tab: {
              border: `${rem(4)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]}`,
              '&[data-active]': {
                borderColor: theme.colorScheme === 'dark' ? theme.colors.brand[8] : theme.colors.brand[6],
              },
            },
          }
        }}
      >
        <Tabs.List grow>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              <Text size="xl">{tab.label}</Text>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <Routes>
        {redirect ? <Route index element={<Navigate replace to={`./${redirect}`} />} /> : null}
        {tabs.map((tab) => (
          <Route key={tab.value} path={`${tab.value}/*`} element={tab.component} />
        ))}
        <Route path="*" element={<Navigate replace to={`./${redirect}`} />} />
      </Routes>
    </Box>
  )
}
