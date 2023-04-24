import { UserRole } from '@prisma/client'
import * as process from 'process'
// Remove trailing slashes from the URLs to avoid double slashes
const API_URL = getUrl('API_URL') ?? 'http://localhost:3000/api'
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const domains: string[] = getFromEnvironment('COOKIE_DOMAINS')

// Infer the cookie domain from the API_URL if it's not set
if (!domains.length) {
  const { hostname } = new URL(API_URL)
  domains.push(hostname)
}

const origins: string[] = getFromEnvironment('CORS_ORIGINS')

const adminPublicKeys = getFromEnvironment('ADMIN_PUBLIC_KEYS')
const userPublicKeys = getFromEnvironment('USER_PUBLIC_KEYS')

// Make sure there is no overlap between admins and users
if (adminPublicKeys.some((key) => userPublicKeys.includes(key))) {
  throw new Error('Admin and User public keys cannot overlap')
}

const appName = 'PubKey'
const appDescription = 'The Social Solana Explorer'

export default () => ({
  api: {
    log: {
      color: process.env.LOG_COLOR?.toLowerCase() !== 'false',
      json: process.env.LOG_JSON?.toLowerCase() !== 'false',
      level: process.env.LOG_LEVEL,
    },
    name: `${appName} API`,
    url: API_URL,
    version: 'dev',
  },
  app: {
    description: appDescription,
    name: appName,
    url: WEB_URL,
  },
  atp: {
    endpoint: process.env.ATP_ENDPOINT,
    identifier: process.env.ATP_IDENTIFIER,
    password: process.env.ATP_PASSWORD,
  },
  cors: {
    bypass: !origins.length,
    origins,
  },
  cookie: {
    domains,
    name: process.env.COOKIE_NAME,
  },
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    enabled: process.env.DISCORD_ENABLED?.toLowerCase() !== 'false',
  },
  environment: process.env.NODE_ENV,
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    enabled: process.env.GITHUB_ENABLED?.toLowerCase() !== 'false',
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    enabled: process.env.GOOGLE_ENABLED?.toLowerCase() !== 'false',
  },
  helius: {
    apiKey: process.env.HELIUS_API_KEY,
  },
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  provision: {
    user: {
      [UserRole.Admin]: adminPublicKeys,
      [UserRole.User]: userPublicKeys,
    },
  },
  redirectSsl: process.env.REDIRECT_SSL?.toLowerCase() !== 'false',
  redis: {
    url: process.env.REDIS_URL,
  },
  web: {
    url: WEB_URL,
  },
})

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return (process.env[key]?.includes(',') ? process.env[key].split(',') : [process.env[key]]).filter(Boolean)
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
