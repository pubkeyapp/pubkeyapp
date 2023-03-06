import * as nacl from 'tweetnacl'

export function signMessage(secretKey: Uint8Array, message: string) {
  const msg = Uint8Array.from(Buffer.from(message))

  return nacl.sign.detached(msg, secretKey)
}
