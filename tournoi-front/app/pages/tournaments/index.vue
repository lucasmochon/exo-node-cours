<template>
  <div class="max-w-5xl mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold text-center mb-8">🏆 Tournois à venir</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="bg-gray-800 text-white rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition"
      >
        <div>
          <h2 class="text-xl font-semibold mb-2">{{ tournament.name }}</h2>
          <p><strong>Jeu :</strong> {{ tournament.game }}</p>
          <p><strong>Date :</strong> {{ tournament.date }}</p>
          <p class="text-gray-300 mt-2">{{ tournament.description }}</p>
        </div>

        <div class="mt-4 text-right">
          <CustomButton @click="goToDetails(tournament.id)">
            Voir les détails
          </CustomButton>
        </div>
        
      </div>
    </div>
  </div>
  
</template>

<script setup>
import CustomButton from '~/components/CustomButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

function goToDetails(id) {
  router.push(`/tournaments/${id}`)
}
</script> 

