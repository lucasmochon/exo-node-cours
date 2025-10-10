<template>
  <v-container class="py-8">
    <!-- Titre -->
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h2 class="text-h3 font-weight-bold title-glow">Tournois e-Sport</h2>
      </v-col>
    </v-row>

    <!-- Liste des tournois -->
    <v-row dense>
      <v-col v-for="t in tournaments" :key="t.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="pa-4 hover-card" elevation="12">
          <v-card-title class="text-h6 font-weight-bold text-white">
            {{ t.nom }}
          </v-card-title>

          <v-card-subtitle class="mb-2 text-gray">
            {{ t.date }} - {{ t.lieu }}
          </v-card-subtitle>

          <v-card-text class="text-white">
            Participants : {{ t.participants }}<br />
            Statut :
            <v-chip small :color="statusColor(t.statut)" class="white--text" label>
              {{ t.statut }}
            </v-chip>
          </v-card-text>

          <v-card-actions>
            <NuxtLink :to="`/tournaments/${t.id}`">
              <v-btn color="cyan darken-2" variant="outlined" class="mr-2"> Voir </v-btn>
            </NuxtLink>
            <v-btn
              color="red darken-2"
              variant="outlined"
              @click="deleteTournament(t.id)"
            >
              Supprimer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Formulaire création -->
    <v-divider class="my-12"></v-divider>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <h3 class="text-h5 mb-4 title-glow">Créer un tournoi</h3>
        <v-form @submit.prevent="createTournament">
          <v-text-field
            v-model="newTournament.nom"
            label="Nom du tournoi"
            required
            outlined
            color="cyan darken-2"
            class="mb-3"
          />
          <v-text-field
            v-model="newTournament.date"
            label="Date"
            type="date"
            required
            outlined
            color="cyan darken-2"
            class="mb-3"
          />
          <v-text-field
            v-model="newTournament.lieu"
            label="Lieu"
            required
            outlined
            color="cyan darken-2"
            class="mb-3"
          />
          <v-text-field
            v-model.number="newTournament.participants"
            label="Participants"
            type="number"
            min="1"
            required
            outlined
            color="cyan darken-2"
            class="mb-3"
          />
          <v-select
            v-model="newTournament.statut"
            :items="['planifié', 'en cours', 'terminé']"
            label="Statut"
            required
            outlined
            color="cyan darken-2"
            class="mb-3"
          />
          <v-btn color="cyan darken-2" type="submit" block> Ajouter </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useApi } from "../../composables/api";
import { useAuthStore } from "../../stores/authStores";

const api = useApi();
const auth = useAuthStore();
const tournaments = ref([]);

const newTournament = ref({
  nom: "",
  date: "",
  lieu: "",
  participants: 0,
  statut: "planifié",
});

async function loadTournaments() {
  tournaments.value = await api.get("/tournaments", auth.token);
}

async function deleteTournament(id: string) {
  if (confirm("Supprimer ce tournoi ?")) {
    await api.del(`/tournaments/${id}`, auth.token);
    await loadTournaments();
  }
}

async function createTournament() {
  await api.post("/tournaments", newTournament.value, auth.token);
  await loadTournaments();
  Object.assign(newTournament.value, {
    nom: "",
    date: "",
    lieu: "",
    participants: 0,
    statut: "planifié",
  });
}

function statusColor(status: string) {
  switch (status) {
    case "planifié":
      return "blue darken-3";
    case "en cours":
      return "amber darken-3";
    case "terminé":
      return "green darken-3";
    default:
      return "grey darken-1";
  }
}

onMounted(loadTournaments);
</script>

<style scoped>
.hover-card {
  background: linear-gradient(135deg, #121212, #1a1a2f);
  border-radius: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 255, 255, 0.3);
}

.title-glow {
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
}

.text-gray {
  color: #aaaaaa;
}
</style>
