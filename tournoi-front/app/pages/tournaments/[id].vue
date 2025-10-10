<template>
  <div class="max-w-3xl mx-auto py-12 px-4 text-white">
    <NuxtLink to="/tournaments" class="text-blue-400 hover:underline mb-6 inline-block">
      ← Retour aux tournois
    </NuxtLink>

    <div v-if="tournament" class="bg-gray-800 rounded-xl p-8 shadow-lg">
      <h1 class="text-3xl font-bold mb-4">{{ tournament.name }}</h1>
      <p><strong>Jeu :</strong> {{ tournament.game }}</p>
      <p><strong>Date :</strong> {{ tournament.date }}</p>
      <p class="mt-4 text-gray-300">{{ tournament.description }}</p>

      <div class="mt-8">
        <CustomButton @click="register">
          S’inscrire
        </CustomButton>
      </div>
    </div>

    <p v-else class="text-center text-gray-400 mt-10">Tournoi introuvable 😢</p>
  </div>
</template>

<script setup>
import CustomButton from '~/components/CustomButton.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

const tournaments = [
  {
    id: 1,
    name: 'League Masters Cup',
    game: 'League of Legends',
    date: '15 Octobre 2025',
    description: 'Tournoi semi-pro réunissant les meilleures équipes EUW.'
  },
  {
    id: 2,
    name: 'Valorant Rising Stars',
    game: 'Valorant',
    date: '22 Octobre 2025',
    description: 'Tournoi ouvert à tous les joueurs montants de la scène FR.'
  },
  {
    id: 3,
    name: 'Rocket League Championship',
    game: 'Rocket League',
    date: '5 Novembre 2025',
    description: 'Compétition rapide et intense en 3v3, niveau international.'
  }
]

const tournament = tournaments.find(t => t.id === id)

function register() {
  alert(`Tu es inscrit au tournoi "${tournament.name}" !`)
}
</script>