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
              hide-details="auto"
              autocomplete="off"
              label="Password"
            />
            <v-text-field
              v-model="cpass"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="off"
              label="Confirm Password"
            />
            <v-checkbox v-model="showPassword" :label="'Show password'" />
            <v-card
              v-if="error"
              color="red"
              dark
              class="text-center my-8"
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
                Register
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-form>
          <div class="text-center mt-8">
            Already have have an account?
            <NuxtLink to="/login">Login</NuxtLink>
          </div>
          <div class="text-center mt-8">
            or back to
            <NuxtLink to="/">Home</NuxtLink>
          </div>
        </v-card-text>
      </v-card>
      <v-card v-if="!loaded" elevation="0" class="mt-8">
        <div align="center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="secondary"
            indeterminate
          />
          <h1 class="h1 mt-8">Verifying <br />Credentials</h1>
        </div>
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
    cpass: '',
    message: '',
    error: false,
    loading: false,
    showPassword: false,
    loaded: false,
  }),
  head: () => ({
    title: 'Register',
  }),
  async created() {
    await this.$fire.authReady()

    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('user', user)
        this.$router.push({ name: 'index' })
      } else {
        this.$store.commit('title', 'Register')
        this.loaded = true
      }
    })
  },
  methods: {
    login() {
      this.message = ''
      this.error = false
      if (this.pass === this.cpass) {
        this.loading = true
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.pass)
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
      } else {
        this.message = "Password doesn't match"
        this.error = true
      }
    },
  },
}
</script>
