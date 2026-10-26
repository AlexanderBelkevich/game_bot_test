import { isTelegram , WebApp} from '../shared/telegram'
import { onMounted, onUnmounted, watchEffect, type Ref } from 'vue'

interface TelegramButtons {
    mainText: Ref<string>
    mainEnabled: Ref<boolean>
    backVisible: Ref<boolean>
    loading?: Ref<boolean>
    onMain: () => void
    onBack: () => void
}

export function useTelegramButtons(buttons: TelegramButtons) {
    if (!isTelegram) return

    const main = WebApp.MainButton
    const back = WebApp.BackButton

    watchEffect(() => {
        main.setParams({
            text: buttons.mainText.value,
            is_active: buttons.mainEnabled.value,
            is_visible: true,
            color: "#3E88F7",
            text_color: "#FFFFFF"
        })
        if (buttons.loading?.value) {
            main.showProgress()
        } else {
            main.hideProgress()
        }

        if (buttons.backVisible.value) {
            back.show()
        } else {
            back.hide()
        }
    })

    onMounted(() => {
        main.onClick(buttons.onMain)
        back.onClick(buttons.onBack)
    })
    onUnmounted(() => {
        main.offClick(buttons.onMain)
        back.offClick(buttons.onBack)
    })

}