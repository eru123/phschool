<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="8">
      <v-card elevation="0">
        <v-card-title>
          <v-spacer />
          <div align="center">Are you sure <br />you want to Logout?</div>
          <v-spacer />
        </v-card-title>
        <v-card-text v-if="error" color="red">
          Error: {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            elevation="0"
            large
            :loading="loading"
            :disabled="loading"
            @click="logout"
          >
            Logout
          </v-btn>

          <v-btn
            color="secondary"
            elevation="0"
            large
            :disabled="loading"
            @click="back"
          >
            Cancel
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Cookies from 'js-cookie'
export default {
  middleware: ['auth-only'],
  data: () => ({
    message: '',
    error: false,
    loading: false,
  }),
  head: () => ({
    title: 'Logout',
  }),
  async created() {
    this.$store.commit('title', 'Logout')
    await this.$fire.authReady()
    this.$fire.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.$store.commit('user', {
          uid: null,
          email: null,
          emailVerified: null,
        })
        this.$router.push({ name: 'login' })
      }
    })
  },
  methods: {
    async logout() {
      this.message = ''
      this.error = false
      this.loading = true
      await this.$fire.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('resetStoreState')
          Cookies.remove('access_token')
        })
        .catch((error) => {
          this.error = true
          this.message = error.message
        })
        .finally(() => {
          this.loading = false
        })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
