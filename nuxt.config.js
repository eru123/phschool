export default {
  publicRuntimeConfig: {
    title: process.env.VUE_APP_TITLE || 'School App',
  },
  privateRuntimeConfig: {},

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | ' + (process.env.VUE_APP_TITLE || 'School App'),
    title: 'phschool',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {},
  },

  firebase: {
    config: {
      apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.VUE_APP_FIREBASE_APPID,
      measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
    },
    services: {
      auth: true, // Just as example. Can be any other service.
    },
    lazy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
