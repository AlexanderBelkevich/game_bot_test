import Fastify from 'fastify'
import { config } from './config.ts'
import {recommendRoutes} from './routes/recommend.ts'

const app = Fastify({logger: true})

await app.register(recommendRoutes)
app.get('/api/health', async () => ({ok: true}))

await app.listen({port: config.port, host: '0.0.0.0'})