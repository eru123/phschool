<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="6" md="4">
      <v-card v-if="loaded" elevation="0">
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              hide-details="auto"
              autocomplete="off"
            />
            <v-text-field
              v-model="pass"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              autocomplete="off"
            />
            <v-checkbox
              v-model="showPassword"
              :label="'Show password'"
              autocomplete="off"
            />
            <v-card
              v-if="error"
              color="red"
              class="text-center my-4"
              dark
              elevation="0"
            >
              <v-card-text> Error: {{ message }} </v-card-text>
            </v-card>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
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
          </v-form>
          <div class="text-center mt-8">
            Do not have have an account?
            <NuxtLink to="/register">Create new account</NuxtLink>
          </div>
          <div class="text-center mt-8">
            or back to
            <NuxtLink to="/">Home</NuxtLink>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="!loaded" elevation="0" class="mt-8">
        <v-card-title>
          <v-spacer />
          <span>Verifying Credentials</span>
          <v-spacer />
        </v-card-title>
        <v-card-text class="text-center my-8">
          <v-progress-circular
            :size="70"
            :width="3"
            color="secondary"
            indeterminate
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout(context) {
    return 'plain'
  },
  middleware: ['nonauth-only'],
  data: () => ({
    email: '',
    pass: '',
    message: '',
    error: false,
    loading: false,
    showPassword: false,
    loaded: false,
  }),
  head: () => ({
    title: 'Login',
  }),
  async created() {
    await this.$fire.authReady()

    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('user', user)
        if (this.$router.currentRoute.query.redirect) {
          this.$router.push(this.$router.currentRoute.query.redirect)
        } else {
          this.$router.push({ name: 'index' })
        }
      } else {
        this.$store.commit('title', 'Login')
        this.loaded = true
      }
    })
  },
  methods: {
    async login() {
      this.message = ''
      this.error = false
      this.loading = true
      await this.$fire.authReady()
      await this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.pass)
        .then((user) => {
          this.$store.commit('user', user)
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
