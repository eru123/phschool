<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="4">
      <v-card elevation="0">
        <v-card-text>
          <v-form>
            <v-text-field v-model="email" label="Email" hide-details="auto" />
            <v-text-field
              v-model="pass"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
            />
            <v-checkbox v-model="showPassword" :label="'Show password'" />
          </v-form>
        </v-card-text>
        <v-card-text v-if="error" color="red">
          <div align="center">Error: {{ message }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            elevation="0"
            large
            :loading="loading"
            :disabled="loading"
            @click="login"
          >
            Login
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout(context) {
    return 'plain'
  },
  data: () => ({
    email: '',
    pass: '',
    message: '',
    error: false,
    loading: false,
    showPassword: false,
  }),
  head: () => ({
    title: 'Login',
  }),
  async created() {
    await this.$fire.authReady()

    if (this.$fire.auth.currentUser) {
      this.$router.push({ name: 'index' })
    }

    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$router.push({ name: 'index' })
      }
    })
  },
  methods: {
    login() {
      this.message = ''
      this.error = false
      this.loading = true
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then(() => {
          this.$router.push({ name: 'inspire' })
        })
        .catch((error) => {
          this.error = true
          this.message = error.message
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
