import type { FastifyInstance } from 'fastify'
import { PLATFORMS, TIME, MOOD, COMPANY, type RecommendBody }from '../types.ts'
import {buildPrompt} from '../prompt.ts'
import {askDeepSeek} from '../deepseek.ts'
import {validateInitData} from '../telegram.ts'
import {config} from '../config.ts'

const bodySchema = {
    type: 'object',
    required: ['answers'],
    additionalProperties: false,
    properties: {
        answers: {
            type: 'object',
            required: ['platform', 'time', 'mood', 'company'],
            additionalProperties: false,
            properties: {
                platform: {type: 'string', enum: PLATFORMS},
                time: {type: 'string', enum: TIME},
                mood: {type: 'string', enum: MOOD},
                company: {type: 'string', enum: COMPANY},
            }
        }
    }
}

export async function recommendRoutes(app: FastifyInstance) {
    app.post<{Body: RecommendBody}>(
        '/api/recommend',
        {schema: {body: bodySchema}},
        async (request, reply) => {
            const initData = String(request.headers['x-telegram-init-data'] ?? '')
            const user = validateInitData(initData, config.botToken)
            if (!user) return reply.code(401).send({error: 'Откройте приложение через Telegram'})
                
            try {
                const games = await askDeepSeek(buildPrompt(request.body))
                request.log.info({count: games.length}, 'reccomendation ok')
                return {games}
            } catch (error) {
                request.log.error(error, 'reccomendation failed')
                return reply.code(502).send({error: 'Не удалось получить подборку'})
            }
        }
    )
}