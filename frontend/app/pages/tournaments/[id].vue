<template>
  <v-app>
    <v-main class="detail-main">
      <v-container class="fill-height d-flex justify-center pt-12">
        <v-card class="detail-card pa-6" elevation="12">
          <v-card-title class="text-h4 font-weight-bold title-glow mb-6">
            Détail du tournoi
          </v-card-title>

          <v-card-text v-if="tournament">
            <v-row class="mb-4" dense>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tournament.nom"
                  label="Nom"
                  outlined
                  rounded
                  color="cyan accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tournament.statut"
                  label="Statut"
                  outlined
                  rounded
                  color="amber darken-2"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tournament.date"
                  label="Date"
                  type="date"
                  outlined
                  rounded
                  color="cyan accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tournament.lieu"
                  label="Lieu"
                  outlined
                  rounded
                  color="cyan accent-4"
                />
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="tournament.participants"
                  label="Participants"
                  type="number"
                  outlined
                  rounded
                  color="green accent-4"
                />
              </v-col>
            </v-row>

            <v-row class="mt-6" justify="center">
              <v-btn
                color="cyan darken-2"
                class="mr-4"
                rounded
                elevation="6"
                @click="save"
              >
                Enregistrer
              </v-btn>
              <v-btn color="red darken-2" rounded elevation="6" @click="goBack">
                Retour
              </v-btn>
            </v-row>
          </v-card-text>

          <v-card-text v-else>
            <v-skeleton-loader type="card" />
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "#app";
import { useApi } from "../../composables/api";
import { useAuthStore } from "../../stores/authStores";

const auth = useAuthStore();
const api = useApi();
const route = useRoute();
const router = useRouter();
const tournament = ref(null);

async function loadTournament() {
  tournament.value = await api.get(`/tournaments/${route.params.id}`, auth.token);
}

async function save() {
  await api.put(`/tournaments/${route.params.id}`, tournament.value, auth.token);
  alert("Tournoi modifié avec succès");
}

function goBack() {
  router.push("/tournaments");
}

onMounted(loadTournament);
</script>

<style scoped>
.detail-main {
  background: linear-gradient(135deg, #0f0f1f, #1a1a2e);
  min-height: 100vh;
}

.detail-card {
  width: 100%;
  max-width: 700px;
  background: linear-gradient(145deg, #121212, #1f1f2e);
  border-radius: 16px;
  box-shadow: 0 0 20px #00ffff50, 0 0 40px #00ffff30;
  transition: transform 0.3s, box-shadow 0.3s;
}

.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px #00ffff80, 0 0 60px #00ffff50;
}

.title-glow {
  color: #00ffff;
  text-shadow: 0 0 8px #00ffff, 0 0 16px #00ffff50;
}

.v-text-field input {
  color: #fff !important;
}

.v-text-field .v-label {
  color: #aaa !important;
}
</style>
