import { PubKeySdk } from './pub-key-sdk'

describe('sdk', () => {
  it('should work', async () => {
    const sdk = await PubKeySdk.setup({ endpoint: 'http://localhost:3000' })

    expect(sdk.config.endpoint).toEqual('http://localhost:3000')
  })
})
