<template>
  <v-card
    v-if="loaded && user.email && !user.emailVerified"
    outlined
    elevation="0"
    class="my-4"
  >
    <v-card-title>Email Verification</v-card-title>
    <v-card-text>
      To use the app, you must verify that your email is
      {{ user.email }}
    </v-card-text>
    <v-card v-if="emailSent" tile elevation="0" color="info" class="mb-4" dark>
      <v-card-title>Email Sent</v-card-title>
      <v-card-text>
        The verification link was sent to your email, open that link and click
        the <b>verify</b> button below
      </v-card-text>
    </v-card>
    <v-card
      v-if="emailSentError"
      tile
      elevation="0"
      color="red"
      class="mb-4"
      dark
    >
      <v-card-title>Email Verification Failed</v-card-title>
      <v-card-text>
        {{ emailSentError }}
      </v-card-text>
    </v-card>
    <v-card v-if="verifyError" tile elevation="0" color="red" class="mb-4" dark>
      <v-card-title>Verification Failed</v-card-title>
      <v-card-text>
        {{ verifyError }}
      </v-card-text>
    </v-card>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        :loading="sending"
        :disabled="sentDisabled || loading"
        elevation="0"
        @click="resend"
      >
        Send link
      </v-btn>
      <v-btn
        color="success"
        :loading="verifying"
        :disabled="loading"
        elevation="0"
        @click="verify"
      >
        Verify
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    timestamp: null,
    verifying: false,
    sending: false,
    loading: false,
    sentDisabled: false,
    verifyError: '',
    emailSent: false,
    emailSentError: '',
  }),
  computed: {
    ...mapState(['user', 'loaded', 'userdata', 'userdataLoaded']),
  },
  methods: {
    resend() {
      this.emailSent = false
      this.sentDisabled = false
      this.loading = true
      this.sending = true
      this.emailSentError = ''
      this.$fire
        .authReady()
        .then(async () => {
          return await this.$fire.auth.currentUser.reload()
        })
        .then(async () => {
          return await this.$fire.auth.currentUser.sendEmailVerification()
        })
        .then(() => {
          this.emailSent = true
          this.sentDisabled = true
          return true
        })
        .catch((e) => {
          this.emailSentError =
            e.message ||
            'The verification email was not sent, please try again later.'
        })
        .finally(() => {
          this.sending = false
          this.loading = false
        })
    },
    verify() {
      this.loading = true
      this.verifying = true
      this.verifyError = ''
      this.$fire
        .authReady()
        .then(async () => {
          return await this.$fire.auth.currentUser.reload()
        })
        .then(() => {
          if (this.$fire.auth.currentUser) {
            const { uid, email, emailVerified } = this.$fire.auth.currentUser
            this.loading = false

            return this.$store.commit('user', { uid, email, emailVerified })
          } else return false
        })
        .catch(() => {
          this.verifyError =
            'Verify your email first by clicking the link that was sent to your email'
        })
        .finally(() => {
          this.loading = false
          this.verifying = false
          if (this.$fire.auth.currentUser) {
            const { uid, email, emailVerified } = this.$fire.auth.currentUser
            this.loading = false

            return this.$store.commit('user', { uid, email, emailVerified })
          } else return false
        })
    },
  },
}
</script>
