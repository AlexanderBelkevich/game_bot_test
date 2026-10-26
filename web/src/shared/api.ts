import type { Answers } from './steps'
import {WebApp} from './telegram'

export interface Game {
  title: string
  genre: string
  why: string
}

export async function fetchRecommendations(answers: Answers): Promise<Game[]> {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': WebApp.initData,
    },
    body: JSON.stringify({answers})
  })

  if (!response.ok) throw new Error(`API ${response.status}`)
  const data = (await response.json()) as { games: Game[] }
  return data.games
}