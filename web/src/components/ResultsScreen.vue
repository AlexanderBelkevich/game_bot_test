<script setup lang="ts">
import GameCard from './GameCard.vue'
import type {Game} from '../shared/api.ts'

defineProps<{
    games: Game[]
    summary: string
    platform: string
}>()
</script>

<template>
    <section class="results">
        <header class="results__header">
            <div>
                <p class="eyebrow">{{ summary }}</p>
                <h1 class="title">Что запустить</h1>
            </div>
        </header>
        <!--Первая игра - большая карточка, остальные - маленькие-->
        <GameCard
            v-for="(game, index) in games"
            :key="game.title"
            :game="game"
            :hero="index === 0"
            :tone="index"
            :platform="platform"
        />
    </section>
</template>