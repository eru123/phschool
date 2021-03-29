<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <v-card class="mt-4" elevation="0">
        <v-card-actions>
          <v-spacer />
          <v-btn elevation="0" color="red" dark to="/classes" router exact>
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-form @submit.prevent="createClass">
        <v-card class="my-8" outlined>
          <v-card-title>Create Class</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Class Name"
              autocomplete="off"
            />
            <v-textarea
              v-model="description"
              label="Class Description"
              autocomplete="off"
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
                @click="createClass"
              >
                Create
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>
export default {
  middleware: ['auth-only'],
  data: () => ({
    loading: false,
    name: '',
    description: '',
    isPublicClass: false,
  }),
  head: () => ({
    title: 'Create Class',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Create Class')
  },
  methods: {
    createClass() {
      //
    },
  },
}
</script>
