import type { Telegram } from '@twa-dev/types'

declare global {
    interface Window {
        Telegram: Telegram
    }
}

export const WebApp = window.Telegram.WebApp

export const isTelegram = Boolean(WebApp.initData)

const APP_BACKGROUND = '#000000'

export function initTelegram() {
    if (!isTelegram) return
    WebApp.ready()
    WebApp.expand()
    WebApp.setHeaderColor(APP_BACKGROUND)
    WebApp.setBackgroundColor(APP_BACKGROUND)
    WebApp.setBottomBarColor(APP_BACKGROUND)
}

export function haptic(kind: 'select' | 'success' | 'error' = 'select') {
    if (!isTelegram) return
    if (kind === 'select') {
        WebApp.HapticFeedback.selectionChanged()
    } else {
        WebApp.HapticFeedback.notificationOccurred(kind)
    }
}

export function openExternal(url: string) {
    if (isTelegram) {
        WebApp.openLink(url)
    } else {
        window.open(url, "_blank")
    }
}