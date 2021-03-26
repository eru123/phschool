<template>
  <div>
    <v-row v-if="user.email" justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="!user.emailVerified" outlined elevation="0" class="my-4">
          <v-card-title>Email Verification</v-card-title>
          <v-card-text>To use the app, you must verify your email</v-card-text>
        </v-card>
        <v-card outlined elevation="0" class="my-4">
          <v-btn nuxt to="/login">Login</v-btn>
          <v-btn nuxt to="/logout">Logout</v-btn>
          <v-card-title class="headline">
            Welcome to the Vuetify + Nuxt.js template
          </v-card-title>
          <v-card-text>
            <p>
              Vuetify is a progressive Material Design component framework for
              Vue.js. It was designed to empower developers to create amazing
              applications.
            </p>
            <p>
              For more information on Vuetify, check out the
              <a
                href="https://vuetifyjs.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                documentation </a
              >.
            </p>
            <p>
              If you have questions, please join the official
              <a
                href="https://chat.vuetifyjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="chat"
              >
                discord </a
              >.
            </p>
            <p>
              Find a bug? Report it on the github
              <a
                href="https://github.com/vuetifyjs/vuetify/issues"
                target="_blank"
                rel="noopener noreferrer"
                title="contribute"
              >
                issue board </a
              >.
            </p>
            <p>
              Thank you for developing with Vuetify and I look forward to
              bringing more exciting features in the future.
            </p>
            <div class="text-xs-right">
              <em><small>&mdash; John Leider</small></em>
            </div>
            <hr class="my-3" />
            <a
              href="https://nuxtjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nuxt Documentation
            </a>
            <br />
            <a
              href="https://github.com/nuxt/nuxt.js"
              target="_blank"
              rel="noopener noreferrer"
            >
              Nuxt GitHub
            </a>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <h1>Welcome</h1>
    </div>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Home',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Home')
  },
}
</script>
