<script setup lang="ts">
import { computed } from 'vue'
import { storeUrl, trailerUrl } from '../shared/links.ts'
import type { Game } from '../shared/api.ts'
import { icons } from '../shared/icons.ts'
import { openExternal } from '../shared/telegram.ts'

const props = defineProps<{
    game: Game
    platform: string
    hero?: boolean
    tone: number
}>()

const initial = computed(() => props.game.title.trim().charAt(0).toUpperCase())
const store = computed(() => storeUrl(props.game.title, props.platform))
</script>

<template>
    <article class="game" :class="[`game--tone-${tone % 3}`, { 'game--hero': hero }]">
        <div class="game__cover">
            <span class="game__initial">{{ initial }}</span>
            <div v-if="hero" class="game__cover-text">
                <span class="game__genre">{{ game.genre }}</span>
                <h2 class="game__title game__title--hero">{{ game.title }}</h2>
            </div>
        </div>
        <div class="game__body">
            <template v-if="!hero">
                <h2 class="game__title">{{ game.title }}</h2>
                <span class="game__genre">{{ game.genre }}</span>
            </template>
            <p class="game__why">{{ game.why }}</p>
            <div class="game__actions">
                <button
                    type="button"
                    class="pill pill-light"
                    @click="openExternal(trailerUrl(game.title))">
                    <span class="pill__icon" v-html="icons.play"/>
                    Трейлер
                </button>
                <button
                    type="button"
                    v-if="store"
                    class="pill"
                    @click="openExternal(store)">
                    <span class="pill__icon" v-html="icons.cart"/>
                    Где купить
                </button>
            </div>
        </div>
    </article>
</template>