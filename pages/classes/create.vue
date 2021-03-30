<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="loaded && userdataLoaded" class="mt-4" elevation="0">
        <v-card-actions>
          <v-spacer />
          <v-btn elevation="0" color="red" dark to="/classes" router exact>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-form v-if="loaded && userdataLoaded" @submit.prevent="createClass">
        <v-card class="my-4" outlined>
          <v-card-title>Create Class</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Class Name"
              minlength="1"
              maxlength="24"
              autocomplete="off"
            />
            <v-textarea
              v-model="description"
              label="Class Description"
              autocomplete="off"
              minlength="4000"
            />
            <v-checkbox v-model="isPublicClass" label="Public Class" />
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
                :disabled="loading"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
      <SkeletonLoader v-if="!userdataLoaded" />
    </v-col>
  </v-row>
</template>
<script>
import { v4 as uuid } from 'uuid'
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
    user() {
      return this.$store.state.user
    },
    userdata() {
      return this.$store.state.userdata
    },
    loaded() {
      return this.$store.state.loaded
    },
    userdataLoaded() {
      return this.$store.state.userdataLoaded
    },
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
      console.log(docId, cD)
    },
  },
}
</script>
