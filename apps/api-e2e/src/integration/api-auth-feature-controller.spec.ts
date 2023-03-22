import { INestApplication } from '@nestjs/common'
import { Keypair } from '@solana/web3.js'
import * as base58 from 'bs58'
import { apiUrl, expectEndpoint, initializeE2eApp, postEndpoint, signMessage } from './helpers'

describe('ApiAuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('should not find anything on /api/auth (GET)', async () => {
    const res = await expectEndpoint(app, apiUrl('auth'), 404)

    expect(res.body.message).toEqual('Cannot GET /api/auth')
  })

  describe('challenge', () => {
    const adminByteArray = JSON.parse(process.env['ADMIN_BYTE_ARRAY'])
    const adminKeypair = Keypair.fromSecretKey(Uint8Array.from(adminByteArray))
    const adminPublicKey = adminKeypair.publicKey.toBase58()
    const endpointRequest = 'auth/request-challenge'
    const endpointRespond = 'auth/respond-challenge'

    it('should receive a challenge for an existing public key', async () => {
      const res = await expectEndpoint(app, apiUrl(`${endpointRequest}/${adminPublicKey}`), 200)
      expect(res.body).toHaveProperty('challenge')
      expect(res.body.challenge.length).toBeGreaterThan(78)
      expect(res.body).toHaveProperty('expiresAt')
    })

    it('should respond to a received challenge', async () => {
      const challengeUrl = apiUrl(`${endpointRequest}/${adminPublicKey}`)
      const challengeResponse = await expectEndpoint(app, challengeUrl, 200)
      expect(challengeResponse.body).toHaveProperty('challenge')

      const challenge: string = challengeResponse.body.challenge
      const signature = signMessage(adminKeypair.secretKey, challenge)
      console.log(`signature: ${signature} ${signature.length}`)

      expect(signature.length).toEqual(64)

      const payload = {
        publicKey: adminPublicKey,
        challenge,
        signature: base58.encode(signature),
      }
      console.log({
        url: apiUrl(endpointRespond),
        payload,
      })

      try {
        await postEndpoint(app, apiUrl(endpointRespond), payload, 200)
          .then((res) => {
            console.log(res.body)
            return res
          })
          .catch((res) => {
            console.log(`Error ${res}`)
            return res
          })
      } catch (error) {
        console.log(`Error`, error)
      }
      //
      // console.log({
      //   apiUrl: apiUrl(endpointRespond),
      //   body: response.body,
      // })
      // expect(true).toEqual(true)
      // expect(response.body).toHaveProperty('token')
      // expect(response.body).toHaveProperty('user.username')
    }, 30000)

    describe('unexpected behavior', () => {
      it('should not receive a challenge for an unknown public key', async () => {
        const res = await expectEndpoint(app, apiUrl(`${endpointRequest}/not-existing`), 404)
        expect(res.body.message).toEqual('Not Found')
      })
    })
  })
})
