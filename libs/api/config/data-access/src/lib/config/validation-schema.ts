import { clusterApiUrl } from '@solana/web3.js'
import * as Joi from 'joi'

const LOG_LEVELS = ['ALL', 'SILLY', 'FINE', 'VERBOSE', 'DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR', 'FATAL', 'OFF']

export const validationSchema = Joi.object({
  ADMIN_PUBLIC_KEYS: Joi.string().required(),
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  COOKIE_NAME: Joi.string().default('__session'),
  DATABASE_URL: Joi.string().required(),
  DISCORD_BOT_PERMISSIONS: Joi.string().default('517543872576'),
  DISCORD_BOT_TOKEN: Joi.string().required(),
  DISCORD_CLIENT_ID: Joi.string().required(),
  DISCORD_CLIENT_SECRET: Joi.string().required(),
  DISCORD_DEVELOPMENT_GUILD_ID: Joi.string(),
  GITHUB_CLIENT_ID: Joi.string().required(),
  GITHUB_CLIENT_SECRET: Joi.string().required(),
  GUM_ENDPOINT: Joi.string().required(),
  HELIUS_API_KEY: Joi.string().required(),
  HOST: Joi.string().default('0.0.0.0'),
  JWT_SECRET: Joi.string().required(),
  LOG_COLOR: Joi.boolean().default('true'),
  LOG_JSON: Joi.boolean().default('false'),
  LOG_LEVEL: Joi.string()
    .equal(...LOG_LEVELS)
    .default('INFO'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  REDIS_URL: Joi.string().required(),
  REDIRECT_SSL: Joi.boolean().default('false'),
  SOLANA_DEVNET_ENDPOINT: Joi.string().default(clusterApiUrl('devnet')),
  SOLANA_MAINNET_ENDPOINT: Joi.string().default(clusterApiUrl('mainnet-beta')),
})
