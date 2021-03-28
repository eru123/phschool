<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8">
        <v-card v-if="loaded" elevation="0" class="my-4">
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" elevation="0" nuxt to="/classes/create"
              >Create</v-btn
            >
            <v-btn color="primary" elevation="0" nuxt to="/classes/join"
              >Join</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  middleware: ['auth-only'],
  head: () => ({
    title: 'Classes',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
    loaded() {
      return this.$store.state.loaded
    },
  },
  created() {
    this.$store.commit('title', 'Classes')
  },
}
</script>
