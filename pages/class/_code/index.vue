<template>
  <v-row v-if="loaded && user.email" justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="my-4">
      <v-card elevation="0">
        <v-btn
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
      <v-card outlined>
        <v-card-title>{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-subtitle class="py-2">
          <b>
            <small> {{ date }} </small>
          </b>
          <br />
          {{ description }}
        </v-card-subtitle>
        <v-card-text class="py-0"> CODE: {{ code }} </v-card-text>
        <v-card-actions class="pt-2">
          <v-spacer />
          <v-btn
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            elevation="0"
            color="success"
            small
          >
            COPY
          </v-btn>
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
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
export default {
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
      show: true,
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
    ...mapState(['loaded', 'user']),
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
