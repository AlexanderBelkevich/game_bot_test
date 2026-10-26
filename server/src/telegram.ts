import {parse, validate} from '@telegram-apps/init-data-node'

export interface TelegramUser {
    id: number
    first_name?: string
    username?: string
}

const MAX_AGE_SECONDS = 24 * 60 * 60

export function validateInitData(initData: string, botToken: string): TelegramUser | null {
    try {
        validate(initData, botToken, {expiresIn: MAX_AGE_SECONDS})
        const data = parse(initData)
        return data.user ?? null
    } catch {
        return null
    }
}