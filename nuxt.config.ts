export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-directus'
  ],
  directus: {
    rest: {
      baseUrl: 'http://localhost:8055', // آدرس بک‌اند دایرکتوس
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@400;700;900&display=swap' }
      ]
    }
  },
  compatibilityDate: '2026-09-01',
  routeRules: {
    '/api/directus/**': { proxy: 'http://localhost:8055/**' }
  }
})