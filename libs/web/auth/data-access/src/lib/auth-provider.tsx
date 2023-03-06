import { Button, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useWalletModal, WalletMultiButton } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { showNotificationSuccess } from '@pubkeyapp/web/ui/core'
import {
  LogoutDocument,
  MeDocument,
  RequestChallengeDocument,
  RespondChallengeDocument,
  useMeQuery,
  User,
} from '@pubkeyapp/web/util/sdk'
import { useWallet } from '@solana/wallet-adapter-react'
import bs58 from 'bs58'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useClient } from 'urql'

export type AuthLoginInput = { publicKey: string }

export interface AuthProviderContext {
  error?: string
  loading: boolean
  loggedIn: boolean
  login: (input: AuthLoginInput) => Promise<void>
  logout: () => Promise<void>
  user: User | undefined
}

const AuthProviderContext = createContext<AuthProviderContext>({} as AuthProviderContext)
function AuthProvider({ children }: { children: ReactNode }) {
  const { connect, connected, connecting, disconnect, publicKey, signMessage } = useWallet()
  const { setVisible } = useWalletModal()
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const [{ data, error: meError, fetching }, refresh] = useMeQuery()
  const client = useClient()
  const [user, setUser] = useState<User | undefined>(undefined)

  useEffect(() => {
    if (fetching || !data || connecting) return

    if (!connected) {
      console.log('Wallet disconnected, showing modal.')
      modals.open({
        title: 'Wallet Disconnected',
        centered: true,
        children: (
          <Stack>
            <Text>Please connect your wallet to continue.</Text>
            <Button
              onClick={() => {
                modals.closeAll()
                setVisible(true)
              }}
            >
              Connect
            </Button>
          </Stack>
        ),
      })
      return
    }

    if (data?.me) {
      console.log(`User authenticated: ${data.me.username}`)
      setUser(data.me)
    } else {
      if (connected && publicKey) {
        console.log(`AuthProvider: connected: ${connected} => ${publicKey}`)
        login({ publicKey: publicKey.toString() })
      }
    }
    setLoading(false)
  }, [fetching, data, connected, publicKey])

  const login = async (input: AuthLoginInput) => {
    if (!signMessage) {
      setError('No signMessage function available.')
      throw new Error('No signMessage function available.')
    }
    setError(undefined)
    setLoading(true)

    console.log(`Logging in with keypair: ${input.publicKey}`)
    const requestChallenge = await client.query(RequestChallengeDocument, { publicKey: input.publicKey }).toPromise()

    if (requestChallenge.error) {
      setError(requestChallenge.error.message || 'Unknown error')
      throw requestChallenge.error
    }

    const challenge = requestChallenge.data.result.challenge

    if (!challenge) {
      setError('No challenge received.')
      throw new Error('No challenge received.')
    }

    const signature = await signMessage(Uint8Array.from(Buffer.from(challenge, 'utf-8')))
    console.log(bs58.encode(signature))

    const respondChallenge = await client
      .mutation(RespondChallengeDocument, {
        publicKey: input.publicKey,
        challenge: requestChallenge.data.result?.challenge,
        signature: bs58.encode(signature),
      })
      .toPromise()

    if (respondChallenge.error) {
      console.log('respondChallenge.error', respondChallenge.error)
      // setError(respondChallenge.error.message || 'Unknown error')
      // throw respondChallenge.error
    }
    await client.query(MeDocument, {}).toPromise()
    setLoading(false)
  }
  const logout = async () => {
    setLoading(true)
    setError(undefined)
    setUser(undefined)
    await client.mutation(LogoutDocument, {}).toPromise()
    await new Promise((resolve) => setTimeout(resolve, 500))
    await disconnect()

    setLoading(false)
    setTimeout(() => {
      navigate('/login')
      location.pathname = '/login'
    }, 10)
  }

  const value = {
    error,
    loading,
    login,
    loggedIn: !!data?.me,
    logout,
    user,
  }
  return <AuthProviderContext.Provider value={value}>{children}</AuthProviderContext.Provider>
}

const useAuth = () => useContext(AuthProviderContext)

export { AuthProvider, useAuth }
