import { existsSync } from 'node:fs'
import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import { config } from './config.ts'
import {recommendRoutes} from './routes/recommend.ts'

const app = Fastify({logger: true})

await app.register(recommendRoutes)
app.get('/api/health', async () => ({ok: true}))

if (existsSync(config.staticDir)) {
  await app.register(fastifyStatic, { root: config.staticDir })
}

await app.listen({port: config.port, host: '0.0.0.0'})