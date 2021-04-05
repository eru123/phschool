<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" class="my-4">
      <v-card elevation="0">
        <v-btn
          v-if="userdataLoaded"
          elevation="0"
          class="mb-4"
          color="primary"
          to="/classes"
          router
          exact
        >
          Back to Classes
        </v-btn>
      </v-card>
      <v-card outlined class="mb-4">
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>
          {{ date }} <b> . </b> {{ admins.length }} admins <b> . </b>
          {{ moderators.length }} moderators
        </v-card-subtitle>
        <v-card-text>
          {{ description }}
        </v-card-text>
      </v-card>
      <v-card v-if="userdataLoaded" outlined class="mb-4">
        <v-card-title> Class Code</v-card-title>
        <v-card-text> {{ code }} </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            elevation="0"
            color="success"
          >
            COPY
          </v-btn>
        </v-card-actions>
        <v-snackbar
          v-model="snackbar.show"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
          right
          bottom
        >
          {{ snackbar.text }}

          <template #action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
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
  async asyncData({ $fire, route }) {
    let data = {
      error: '',
      title: '',
      description: '',
    }
    try {
      const code = route.params.code
      await $fire.firestoreReady()
      const db = $fire.firestore
      const docRef = db.collection('classes').doc(code)
      return await docRef.get().then((doc) => {
        if (doc.exists) {
          const docData = doc.data()
          data = { ...docData, error: data.error }
        } else {
          data.error = 'Class not found'
        }
        return { ...data }
      })
    } catch {
      data.error = 'Failed to retrieve data'
    }

    return { ...data }
  },
  data: () => ({
    snackbar: {
      show: false,
      text: '',
      timeout: 2000,
      color: '',
    },
    snackbarText: '',
  }),
  head() {
    return {
      title: this.title || 'Class',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
  computed: {
    ...mapState(['loaded', 'user', 'userdataLoaded']),
  },
  methods: {
    onCopy(e) {
      this.snackbar.show = true
      this.snackbar.text = 'Code copied!'
      this.snackbar.color = 'success'
    },
    onError(e) {
      this.snackbar.show = true
      this.snackbar.text = 'Code failed copied!'
      this.snackbar.color = 'warning'
    },
  },
}
</script>
