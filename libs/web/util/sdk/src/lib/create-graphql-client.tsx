import { createClient as createWSClient } from 'graphql-ws'
import { createClient, defaultExchanges, subscriptionExchange } from 'urql'

export function createGraphqlClient(url: string) {
  if (!url.startsWith('http')) {
    url = `${location.origin}${url}`
  }

  const wsUrl = url.replace(/^http/, 'ws')
  const wsClient = createWSClient({
    url: wsUrl,
    connectionParams: {
      credentials: 'include',
    },
  })

  return createClient({
    url,
    fetchOptions: {
      credentials: 'include',
      mode: 'cors',
    },
    requestPolicy: 'network-only',
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription: (operation) => ({
          subscribe: (sink) => ({
            unsubscribe: wsClient.subscribe(operation, sink),
          }),
        }),
      }),
    ],
  })
}
