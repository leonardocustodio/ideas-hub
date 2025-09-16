// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-11',
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxthub/core',
    '@nuxt/eslint',
    'nuxt-auth-utils'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  fonts: {
    families: [
      {
        name: 'Orbitron',
        provider: 'google',
        weights: [400, 700, 900]
      },
      {
        name: 'Fira Code',
        provider: 'google',
        weights: [300, 400, 500, 700]
      }
    ]
  },
  hub: {
    database: true,
    blob: true,
    kv: false,
    cache: false,
    bindings: {
      observability: {
        logs: true,
      },
    }
  },
  app: {
    head: {
      title: 'Polkadot Ideas Hub',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  nitro: {
    experimental: {
      tasks: true,
    }
  }
})
