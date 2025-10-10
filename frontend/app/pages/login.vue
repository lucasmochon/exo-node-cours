<template>
  <v-app>
    <v-main class="login-main">
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="login-card pa-8" elevation="12">
          <v-card-title class="justify-center text-h4 font-weight-bold title-glow">
            Connexion
          </v-card-title>

          <v-card-text>
            <v-alert v-if="error" type="error" dense class="mb-4">
              {{ error }}
            </v-alert>

            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                outlined
                rounded
                dense
                color="cyan accent-4"
                class="mb-4"
                required
              />

              <v-text-field
                v-model="password"
                label="Mot de passe"
                type="password"
                outlined
                rounded
                dense
                color="cyan accent-4"
                class="mb-6"
                required
              />

              <v-btn
                type="submit"
                :loading="loading"
                color="cyan darken-2"
                block
                rounded
                elevation="6"
                class="login-btn"
              >
                Se connecter
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center mt-4">
            <span class="footer-text">&copy; 2025 Mon App</span>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useApi } from "~/composables/api";
import { useAuthStore } from "../stores/authStores";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();
const api = useApi();
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function handleLogin() {
  error.value = "";
  if (!email.value || !password.value) {
    error.value = "Veuillez remplir tous les champs.";
    return;
  }

  loading.value = true;

  try {
    const data = await api.post("/users/login", {
      email: email.value,
      motDePasse: password.value,
    });
    auth.setToken(data.token);
    auth.setUser(data.user);
    router.push("/tournaments");
  } catch (err) {
    error.value = err.message || "Erreur serveur";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-main {
  background: linear-gradient(135deg, #0f0f1f, #1a1a2e);
  min-height: 100vh;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: linear-gradient(145deg, #121212, #1f1f2e);
  border-radius: 16px;
  box-shadow: 0 0 20px #00ffff50, 0 0 40px #00ffff30;
  transition: transform 0.3s, box-shadow 0.3s;
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 30px #00ffff80, 0 0 60px #00ffff50;
}

.title-glow {
  color: #00ffff;
  text-shadow: 0 0 8px #00ffff, 0 0 16px #00ffff50;
}

.login-btn {
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 4px #00ffff;
}

.login-btn:hover {
  box-shadow: 0 0 12px #00ffff, 0 0 24px #00ffff50;
}

.footer-text {
  color: #aaaaaa;
  font-size: 0.85rem;
  text-shadow: 0 0 2px #00ffff20;
}
</style>
