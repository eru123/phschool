import Vue from 'vue'
import Vuetify from 'vuetify'

// import colors from './../config/colors'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

export default (ctx) => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          //   ...colors,
        },
        dark: {
          // colors
        },
      },
    },
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
