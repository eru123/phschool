<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <SkeletonLoader v-if="!loaded" />
      <div v-if="loaded && user.email">
        <v-card outlined class="my-4">
          <v-card-title>Default Photo</v-card-title>
          <v-card-text>
            <v-row class="text-center">
              <v-row justify="center" align="center">
                <v-btn elevation="0" color="primary">Upload</v-btn>
              </v-row>
              <v-col cols="6">
                <v-img
                  v-if="details.defaultPhoto"
                  :src="details.defaultPhoto"
                />
                <v-icon v-if="!details.defaultPhoto"> mdi-account </v-icon>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card outlined class="my-4">
          <v-card-title>Edit Account Details</v-card-title>
          <v-form @submit.prevent="saveDetails">
            <v-card-text>
              <v-text-field v-model="details.name" label="Name" />
            </v-card-text>
            <v-card-text v-if="error" color="red">
              Error: {{ error }}
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                :disabled="loading"
                elevation="0"
                color="primary"
                @click="resetDetails"
              >
                <v-icon class="mr-2">mdi-trash-can</v-icon>
                Default
              </v-btn>
              <v-btn
                :disabled="loading"
                :loading="saveLoading"
                elevation="0"
                color="primary"
                @click="saveDetails"
              >
                <v-icon class="mr-2">mdi-content-save</v-icon>
                Apply
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import SkeletonLoader from '~/components/SkeletonLoader.vue'
export default {
  components: {
    SkeletonLoader,
  },
  middleware: ['auth-only'],
  data: () => ({
    details: {
      name: '',
      defaultPhoto:
        'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/104113705/original/6076831db34315e45bd2a31a9d79bb7b91d48e04/design-flat-style-minimalist-avatar-of-you.jpg',
    },
    loading: false,
    saveLoading: false,
    error: '',
  }),
  head: () => ({
    title: 'Account',
  }),
  computed: {
    loaded() {
      return this.$store.state.loaded
    },
    user() {
      return this.$store.state.user
    },
    userdata() {
      return this.$store.state.userdata
    },
  },
  created() {
    this.$store.commit('title', 'Account')
    this.resetDetails()
  },
  methods: {
    resetDetails() {
      this.error = ''
      const { name } = this.$store.state.userdata
      this.details = { name }
    },
    async saveDetails() {
      this.loading = true
      this.saveLoading = true
      this.error = ''
      await this.$fire.firestoreReady()
      const db = this.$fire.firestore
      const doc = await db.collection('users').doc(this.user.uid)

      await doc
        .set({ ...this.details }, { merge: true })
        .then(async () => {
          const prep = await doc.get()
          if (prep.exists) {
            const data = await prep.data()
            this.$store.commit('userdata', data)
            return data
          }
          this.error = 'Failed to save details'
        })
        .catch((e) => {
          this.error = e.message
          // 'There is a problem saving you account details, try again later.'
        })
        .finally(() => {
          this.loading = false
          this.saveLoading = false
        })
    },
  },
}
</script>
