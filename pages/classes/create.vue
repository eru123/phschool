<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" class="my-4">
      <v-card v-if="userdataLoaded" elevation="0">
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
      <v-form v-if="userdataLoaded" @submit.prevent="createClass">
        <v-card class="my-4" outlined>
          <v-card-title>Create Class</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Class Name"
              :disabled="loading"
              minlength="1"
              maxlength="24"
              autocomplete="off"
            />
            <v-textarea
              v-model="description"
              :disabled="loading"
              label="Class Description"
              autocomplete="off"
              minlength="4000"
            />
            <v-checkbox
              v-model="isPublicClass"
              :disabled="loading"
              label="Public Class"
            />
            <p>
              Auto accept student's request if <b>Public Class</b> is enabled
            </p>
            <v-card-actions>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                elevation="0"
                large
                :loading="loading"
                :disabled="loading || offline"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
      <SkeletonLoader />
    </v-col>
  </v-row>
</template>
<script>
import { v1 as uuid } from 'uuid'
import { mapState } from 'vuex'
import SkeletonLoader from '~/components/SkeletonLoader.vue'
export default {
  components: {
    SkeletonLoader,
  },
  middleware: ['auth-only'],
  data: () => ({
    loading: false,
    error: '',
    name: '',
    description: '',
    color: 'secondary',
    isPublicClass: false,
  }),
  head: () => ({
    title: 'Create Class',
  }),
  computed: {
    ...mapState(['user', 'userdata', 'loaded', 'userdataLoaded', 'offline']),
  },
  created() {
    this.$store.commit('title', 'Create Class')
  },
  methods: {
    createClass() {
      const { name, color, description, isPublicClass, user, userdata } = this
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      const dateNow = Date.now()
      const date = new Date(dateNow)
      const docId = uuid()
      const cD = {
        code: docId,
        title: name,
        description,
        public: isPublicClass,
        creatorId: user.uid,
        creatorName: userdata.name,
        admins: [user.uid],
        moderators: [],
        pending: [],
        accepted: [],
        timestamp: dateNow,
        color,
        date: `${
          months[date.getMonth()]
        } ${date.getDay()} ${date.getFullYear()}`,
      }
      this.sendData(docId, cD)
    },
    async sendData(code, data) {
      this.loading = true
      await this.$fire.firestoreReady()
      const docRef = this.$fire.firestore.collection('classes').doc(code)
      const doc = await docRef.get()
      if (!doc.exists) {
        await docRef
          .set(data)
          .then(() => {
            this.loading = false
            this.$router.push(`/class/${code}/`)
          })
          .catch((e) => {
            this.error = e.message || 'Unkown error occur, try again later'
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.error =
          'Class code already exists, click create button again to create new code'
        this.loading = false
      }
    },
  },
}
</script>
