type Platform = 'playstation' | 'xbox' | 'switch' | 'pc' | 'mobile'

const q = encodeURIComponent

const storeSearch: Record<Platform, (title: string) => string> = {
  playstation: (t) => `https://store.playstation.com/search/${q(t)}`,
  xbox: (t) => `https://www.xbox.com/search?q=${q(t)}`,
  switch: (t) => `https://www.nintendo.com/search/?q=${q(t)}`,
  pc: (t) => `https://store.steampowered.com/search/?term=${q(t)}`,
  mobile: (t) => `https://www.google.com/search?q=${q(`${t} App Store Google Play`)}`,
}

export function trailerUrl(title: string): string {
  return `https://www.youtube.com/results?search_query=${q(`${title} трейлер`)}`
}

export function storeUrl(title: string, platform: string): string {
  const search = storeSearch[platform as Platform]
  return search ? search(title) : ''
}