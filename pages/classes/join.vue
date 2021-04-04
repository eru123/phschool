<template>
  <v-row v-if="loaded && user.email" justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="my-4">
      <v-card outlined>
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
    </v-col>
  </v-row>
</template>
<script>
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
    classCode: '',
  }),
  head() {
    return {
      title: this.title + ' - class by ' + this.creatorName,
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
    loaded() {
      return this.$store.state.loaded
    },
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Join Class')
  },
  methods: {
    joinClass() {
      console.log('joined')
    },
  },
}
</script>
