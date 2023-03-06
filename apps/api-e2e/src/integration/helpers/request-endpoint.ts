import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

export function getEndpoint(app: INestApplication, endpoint: string) {
  return request(app.getHttpServer()).get(endpoint)
}

export function expectEndpoint(app: INestApplication, endpoint: string, expect: number) {
  return getEndpoint(app, endpoint).expect(expect)
}

export function postEndpoint(app: INestApplication, endpoint: string, data: object = {}, expect = 201) {
  return request(app.getHttpServer()).post(endpoint).send(data).expect(expect)
}

export function apiUrl(path: string) {
  return `/api/${path}`
}
