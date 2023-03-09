import React, { ReactNode } from 'react'

export interface WebDevProviderContext {}

const WebDevContext = React.createContext<WebDevProviderContext>({})

function WebDevProvider(props: { children: ReactNode }) {
  const { children } = props

  const value = {}
  return <WebDevContext.Provider value={value}>{children}</WebDevContext.Provider>
}

const useWebDev = () => React.useContext(WebDevContext)

export { WebDevProvider, useWebDev }
