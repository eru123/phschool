<template>
  <v-row v-if="loaded && user.email" justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="my-4">
      <v-card v-if="loaded && userdataLoaded" elevation="0">
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="loading"
            elevation="0"
            color="red"
            dark
            to="/classes"
            router
            exact
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="loaded && userdataLoaded" class="my-4" outlined>
        <v-card-title> Join Class </v-card-title>
        <v-card-subtitle> Input the class code </v-card-subtitle>
        <v-form @submit.prevent="joinClass">
          <v-card-text>
            <v-text-field
              v-model="classCode"
              label="Code"
              hide-details="auto"
              autocomplete="off"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn elevation="0" type="submit" color="primary">JOIN</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <SkeletonLoader />
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import SkeletonLoader from '~/components/SkeletonLoader.vue'
export default {
  components: {
    SkeletonLoader,
  },
  middleware: ['auth-only'],
  data: () => ({
    classCode: '',
    loading: false,
  }),
  head() {
    return {
      title: 'Join Class',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Join to your class now',
        },
      ],
    }
  },
  computed: {
    ...mapState(['loaded', 'user', 'userdataLoaded']),
  },
  created() {
    this.$store.commit('title', 'Join Class')
  },
  methods: {
    async joinClass() {
      await this.$fire.firestoreReady()
      this.loading = true
      const docRef = this.$fire.firestore
        .collection('classes')
        .doc(this.classCode)
      const docData = await docRef.get()

      console.log(docData)
    },
  },
}
</script>
