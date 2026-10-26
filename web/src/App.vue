<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import ResultsScreen from './components/ResultsScreen.vue'
import { createEmptyAnswers, steps, summaryLabel} from './shared/steps.ts'
import { haptic, initTelegram, isTelegram } from './shared/telegram.ts'
import { fetchRecommendations, type Game } from './shared/api.ts'
import { icons } from './shared/icons.ts'
import { useTelegramButtons } from './composables/useTelegramButtons.ts'

type Screen = 'wizard' | 'results'

const screen = ref<Screen>('wizard')
const stepIndex = ref(0)
const answers = ref(createEmptyAnswers())
const games = ref<Game[]>([])
const loading = ref(false)
const error = ref('')

const currentStep = computed(() => steps[stepIndex.value])
const isLastStep = computed(() => stepIndex.value === steps.length - 1)
const canProceed = computed(() => answers.value[currentStep.value.key] !== '')

function select(value: string) {
  haptic('select')
  answers.value[currentStep.value.key] = value
}

const mainText = computed(() => {
  if (screen.value === 'results') return 'Еще варианты'
  return isLastStep.value ? 'Подобрать игры' : 'Дальше'
})
const mainEnabled = computed(() => !loading.value && (screen.value === 'results' || canProceed.value))
const backVisible = computed(() => screen.value === 'results' || stepIndex.value > 0)

const summary = computed(() => summaryLabel(answers.value))

async function recommend() {
  loading.value = true
  error.value = ''
  try {
    games.value = await fetchRecommendations(answers.value)
    screen.value = 'results'
    haptic('success')
  } catch {
    error.value = 'Не удалось подобрать игры. Нажмите кнопку еще раз.'
    haptic('error')
  } finally {
    loading.value = false
  }
}

function next() {
  if (!mainEnabled.value) return
  if (screen.value === 'results' || isLastStep.value) {
    recommend()
    return
  }
  stepIndex.value++
}

function back() {
  if (screen.value === 'results') {
    screen.value = 'wizard'
    return
  }
  if (stepIndex.value > 0) stepIndex.value--
}

useTelegramButtons({mainText, mainEnabled, backVisible, onMain: next, onBack: back})

onMounted(() => initTelegram())
</script>

<template>
  <main class="app">
  <!-- Прогресс бар-->
  <template v-if="screen === 'wizard'">
    <div class="progress" :aria-label="`Шаг ${stepIndex + 1} из ${steps.length}`">
      <span
        v-for="(step, index) in steps"
        :key="step.key"
        class="progress__bar"
        :class="{'progress__bar--done': index <= stepIndex}"
      />
    </div>
    <p class="eyebrow">Шаг {{stepIndex + 1}} из {{steps.length}}</p>
    <h1 class="title">{{ currentStep.title }}</h1>

    <div class="options">
      <button
        v-for="option in currentStep.options"
        :key="option.value"
        type="button"
        class="option"
        :class="[`option--${option.tone}`, {'option--active': answers[currentStep.key] === option.value}]"
        @click="select(option.value)"
      >
        <span class="option__top">
          <span class="option__icon" v-html="icons[option.icon]"/>
          <span
            v-if="answers[currentStep.key] === option.value"
            class="option__check"
            v-html="icons.check"/>
        </span>
        <span class="option__label">{{ option.label }}</span>
      </button>
    </div>
  </template>

  <ResultsScreen
    v-else
    :games="games"
    :summary="summary"
    :platform="answers.platform"
  />

  <p v-if="error" class="error">{{ error }}</p>


   <div v-if="!isTelegram" class="dev-controls">
    <button
      v-if="stepIndex > 0"
      type="button" 
      class="dev-controls__back" 
      @click="back">Назад</button>
    <button 
      type="button" 
      class="dev-controls__main" 
      :disabled="!canProceed || isLastStep" 
      @click="next">Дальше</button>
   </div>
  </main>
</template>
