import type { IconName } from './icons'

export type StepKey = 'platform' | 'time' | 'mood' | 'company'
export type Tone = 'blue' | 'green' | 'red' | 'violet' | 'teal' | 'plum' | 'orange'

export interface StepOption {
    value: string
    label: string
    tone: Tone
    icon: IconName
}

export interface StepConfig {
    key: StepKey
    title: string
    options: StepOption[]
}

export type Answers = Record<StepKey, string>

export const createEmptyAnswers = (): Answers => ({
    platform: '',
    time: '',
    mood: '',
    company: ''
})

export const steps: StepConfig[] = [
  {
    key: 'platform',
    title: 'На чём играем?',
    options: [
      { value: 'playstation', label: 'PlayStation', tone: 'blue', icon: 'gamepad' },
      { value: 'xbox', label: 'Xbox', tone: 'green', icon: 'xbox' },
      { value: 'switch', label: 'Nintendo Switch', tone: 'red', icon: 'joycons' },
      { value: 'pc', label: 'PC', tone: 'violet', icon: 'monitor' },
      { value: 'mobile', label: 'Телефон', tone: 'orange', icon: 'phone' },
    ],
  },
  {
    key: 'time',
    title: 'Сколько есть времени?',
    options: [
      { value: 'short', label: '15–30 минут', tone: 'green', icon: 'clock' },
      { value: 'evening', label: 'Вечер', tone: 'violet', icon: 'moon' },
      { value: 'weekend', label: 'Все выходные', tone: 'orange', icon: 'calendar' },
    ],
  },
  {
    key: 'mood',
    title: 'Какое настроение?',
    options: [
      { value: 'relax', label: 'Расслабиться', tone: 'teal', icon: 'leaf' },
      { value: 'challenge', label: 'Хочу челлендж', tone: 'red', icon: 'flame' },
      { value: 'story', label: 'Хочу историю', tone: 'plum', icon: 'book' },
      { value: 'fun', label: 'Посмеяться', tone: 'orange', icon: 'smile' },
    ],
  },
  {
    key: 'company',
    title: 'С кем играем?',
    options: [
      { value: 'solo', label: 'Один', tone: 'blue', icon: 'user' },
      { value: 'coop', label: 'С друзьями', tone: 'green', icon: 'users' },
    ],
  },
]

export function summaryLabel(answers: Answers): string {
  const pick = (key: StepKey) => {
    const step = steps.find((s) => s.key === key)
    return step?.options.find((o) => o.value === answers[key])?.label
  }
  return [pick('time'), pick('mood')].filter(Boolean).join(" ")
}