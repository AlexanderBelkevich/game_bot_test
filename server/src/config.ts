import path from 'node:path'

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Не задана переменная окружения ${name} - добавьте ее в .env`)
    }
    return value
}

export const config = {
    port: Number(process.env.PORT ?? 3000),
    deepseekApiKey: requireEnv('DEEPSEEK_API_KEY'),
    deepseekModel: process.env.DEEPSEEK_MODEL ?? 'deepseek-v4-flash',
    botToken: requireEnv('BOT_TOKEN'),
    staticDir: process.env.STATIC_DIR ?? path.resolve(import.meta.dirname, '../../web/dist')
}