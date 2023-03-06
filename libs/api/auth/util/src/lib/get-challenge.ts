import { Keypair } from '@solana/web3.js'
import * as bs58 from 'bs58'

export function getChallenge(publicKey): { challenge: string; expiresAt: string } {
  const random = Keypair.generate().publicKey.toBase58()
  const expiresAt = new Date().getTime() + 30_000
  const challenge = `${random}.${expiresAt}.${publicKey}`

  const buffer = Buffer.from(challenge)
  return {
    challenge: bs58.encode(buffer),
    expiresAt: expiresAt.toString(),
  }
}
