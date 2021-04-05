<template>
  <v-card
    v-if="userdataLoaded && user.email && user.emailVerified && !userdata.name"
    outlined
    elevation="0"
    class="my-4"
  >
    <v-card-title>Name is required</v-card-title>
    <v-card-text>
      <p>
        In order to address our users without exposing their emails, we require
        you to provide a name for your account, this will serve as your
        nickname, it can be an Alpha-Symbolic-Numeric Characters.
      </p>
      <v-form @submit.prevent="changeName">
        <v-text-field
          v-model="name"
          label="Your name"
          hide-details="auto"
          autocomplete="off"
        />
        <v-card-actions class="mt-4">
          <v-spacer />
          <v-btn
            color="primary"
            :disabled="loading"
            :loading="loading"
            elevation="0"
            @click="changeName"
          >
            Save Name
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    name: '',
    loading: false,
    error: null,
  }),
  computed: {
    ...mapState(['user', 'loaded', 'userdata', 'userdataLoaded']),
  },
  methods: {
    async changeName() {
      if (this.name.length > 0) {
        this.loading = true
        await this.$fire.firestoreReady()
        const ref = this.$fire.firestore.collection('users').doc(this.user.uid)
        const doc = await ref.get()

        const data = await doc.data()
        data.name = this.name
        await ref.set(data).then(() => this.$store.commit('userdata', data))
        this.loading = false
      } else {
        this.error = 'Invalid name'
      }
    },
  },
}
</script>
