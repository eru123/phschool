<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <SkeletonLoader />
      <div v-if="userdataLoaded && user.emailVerified">
        <DefaultPhoto />
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
                type="submit"
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
import { mapState } from 'vuex'
import DefaultPhoto from '~/components/AccountChangeDefaultPhoto.vue'
import SkeletonLoader from '~/components/SkeletonLoader.vue'
export default {
  components: {
    SkeletonLoader,
    DefaultPhoto,
  },
  middleware: ['auth-only'],
  data: () => ({
    details: {
      name: '',
    },
    dialog: false,
    upBtn: true,
    loading: false,
    saveLoading: false,
    error: '',
  }),
  head: () => ({
    title: 'Account',
  }),
  computed: {
    ...mapState(['loaded', 'user', 'userdata', 'userdataLoaded']),
  },
  watch: {
    userdata() {
      this.resetDetails()
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
            return data
          }
          this.error = 'Failed to save details'
        })
        .catch((e) => {
          this.error =
            e.message ||
            'There is a problem saving you account details, try again later.'
        })
        .finally(() => {
          this.loading = false
          this.saveLoading = false
        })
    },
  },
}
</script>
