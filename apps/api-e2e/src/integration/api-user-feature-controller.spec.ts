import { INestApplication } from '@nestjs/common'
import { apiUrl, expectEndpoint, getEndpoint, initializeE2eApp } from './helpers'

describe('ApiUserFeatureController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeE2eApp()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/user (GET)', async () => {
    const res = await expectEndpoint(app, apiUrl('user'), 404)

    expect(res.body.message).toEqual('Cannot GET /api/user')
  })

  it('/api/user/find-many (GET)', async () => {
    const res = await getEndpoint(app, apiUrl('user/find-many'))

    expect(res.body).toBeInstanceOf(Array)
  })

  it('/api/user/find-one (GET)', async () => {
    const res = await expectEndpoint(app, apiUrl('user/find-one/-test-'), 404)

    expect(res.body).toBeInstanceOf(Object)
    expect(res.body.statusCode).toEqual(404)
    expect(res.body.message).toEqual('Not Found')
  })
})
