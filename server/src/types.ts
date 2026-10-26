export const PLATFORMS = ['playstation', 'xbox', 'switch', 'pc', 'mobile'] as const
export const TIME = ['short', 'evening', 'weekend']
export const MOOD = ['relax', 'challenge', 'story', 'fun']
export const COMPANY = ['solo', 'coop']

export interface RecommendBody {
    answers: {
        platform: string
        time: string
        mood: string
        company: string
    }
}

export interface Game {
    title: string
    genre: string
    why: string
}