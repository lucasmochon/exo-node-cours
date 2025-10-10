import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/ui',
  ],

  components: {
    dirs: [{ path: '~/app/components', pathPrefix: false }]
  },

  css: [
    'vuetify/styles',
  ],
  build: {
    transpile: ['vuetify'],
  },
})