<template>
  <v-app-bar flat height="64" class="e-sport-bar" elevate-on-scroll color="dark">
    <v-container class="d-flex align-center justify-space-between" fluid>
      <v-row class="align-center" dense>
        <!-- Dropdown Tournois -->
        <v-menu v-model="showMenu" offset-y transition="scale-transition" max-width="250">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              class="mx-2"
              variant="tonal"
              color="cyan darken-3"
              rounded
              elevation="2"
            >
              🏅 Tournois
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list class="dark-menu">
            <v-list-item v-for="(item, i) in tournaments" :key="i" :to="item.path" link>
              <v-list-item-icon v-if="item.icon">
                <span>{{ item.icon }}</span>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Autres boutons -->
        <v-row class="align-center">
          <template v-if="!auth.isLoggedIn">
            <v-btn
              v-for="(item, i) in others"
              :key="i"
              :to="item.path"
              class="mx-2"
              variant="tonal"
              color="purple accent-4"
              rounded
              elevation="2"
            >
              <span v-if="item.icon">{{ item.icon }}</span>
              {{ item.title }}
            </v-btn>
          </template>

          <template v-else>
            <!-- User connecté : bouton profil -->
            <v-menu offset-y>
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  class="mx-2"
                  variant="tonal"
                  color="teal darken-2"
                  rounded
                  elevation="2"
                >
                  <v-icon left>mdi-account-circle</v-icon>
                  {{ auth.user?.prenom || "Profil" }}
                  <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list class="dark-menu">
                <v-list-item @click="goToProfile">
                  <v-list-item-title>Mon profil</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>Se déconnecter</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-row>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStores";
import { pages } from "../data/pages";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const tournaments = pages.filter((p) => p.group === "tournaments");
const others = pages.filter((p) => p.group !== "tournaments");

const showMenu = ref(false);

function logout() {
  auth.logout();
  router.push("/login");
}

function goToProfile() {
  router.push("/profile"); // créer cette page si elle n'existe pas encore
}
</script>

<style scoped>
.e-sport-bar {
  background: linear-gradient(90deg, #0f0f1f, #1a1a2e);
  color: #00ffff;
  box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);
}

.dark-menu {
  background: #1a1a2e;
  color: #00ffff;
}

.dark-menu .v-list-item:hover {
  background: rgba(0, 255, 255, 0.1);
}
</style>
