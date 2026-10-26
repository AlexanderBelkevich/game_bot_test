import {config} from './config.ts'
import type { Game } from './types.ts'

export async function askDeepSeek(prompt: {system: string, user: string}): Promise<Game[]> {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.deepseekApiKey}`
        },
        body: JSON.stringify({
            model: config.deepseekModel,
            thinking: {type: 'disabled'},
            response_format: {type: 'json_object'},
            messages: [
                {role: 'system', content: prompt.system},
                {role: 'user', content: prompt.user}
            ]
        })
    })

    if (!response.ok) throw new Error(`DeepSeek ответил ${response.status}`)
    // choices[0].message.content
    const data = (await response.json()) as {choices: {message: {content: string}}[]}
    const {games} = JSON.parse(data.choices[0].message.content) as {games: Game[]}
    return games
}