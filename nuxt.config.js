export default {
  publicRuntimeConfig: {
    title: process.env.VUE_APP_TITLE || 'School App',
  },
  privateRuntimeConfig: {},
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
  server: {
    host: '0.0.0.0',
  },
  css: [],
  plugins: ['~/plugins/firebase.js'],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/firebase'],
  axios: {},
  pwa: {
    icon: {
      source: '~/static/icon.png',
      fileName: 'icon.png',
    },
    manifest: {
      lang: 'en',
    },
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {},
  },
  env: {
    VUE_APP_FIREBASE_APIKEY: process.env.VUE_APP_FIREBASE_APIKEY,
    VUE_APP_FIREBASE_AUTHDOMAIN: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
    VUE_APP_FIREBASE_DATABASEURL: process.env.VUE_APP_FIREBASE_DATABASEURL,
    VUE_APP_FIREBASE_PROJECTID: process.env.VUE_APP_FIREBASE_PROJECTID,
    VUE_APP_FIREBASE_STORAGEBUCKET: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
    VUE_APP_FIREBASE_MESSAGINGSENDERID:
      process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
    VUE_APP_FIREBASE_APPID: process.env.VUE_APP_FIREBASE_APPID,
    VUE_APP_FIREBASE_MEASUREMENTID: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
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
      auth: true,
      // auth: {
      //   persistence: 'local', // default
      //   initialize: {
      //     onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      //     onAuthStateChangedAction: 'onAuthStateChangedAction',
      //     subscribeManually: false,
      //   },
      //   ssr: {
      //     credential: true,
      //     serverLogin: true,
      //   },
      // emulatorPort: process.env.NODE_ENV === 'development' ? 9099 : undefined,
      // emulatorHost:
      //   process.env.NODE_ENV === 'development'
      //     ? 'http://localhost'
      //     : undefined,
      // },
      firestore: true,
      // firestore: {
      //   emulatorPort: process.env.NODE_ENV === 'development' ? 8040 : undefined,
      //   emulatorHost:
      //     process.env.NODE_ENV === 'development' ? 'localhost' : undefined,
      // },
      storage: true,
    },
    lazy: true,
  },
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  },
}
