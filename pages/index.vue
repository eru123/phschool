<template>
  <div>
    <v-row v-if="loaded && user.email" justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <EmailVerification v-if="!user.emailVerified" />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card v-if="!loaded" outlined elevation="0" class="my-4">
          <v-skeleton-loader type="article, actions"> </v-skeleton-loader>
        </v-card>
        <v-card v-if="!loaded" outlined elevation="0" class="my-4">
          <v-skeleton-loader
            type="table-heading, list-item-two-line, image, table-tfoot"
          >
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import EmailVerification from '~/components/CardEmailVerification.vue'
export default {
  components: {
    EmailVerification,
  },
  head: () => ({
    title: 'Home',
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
    this.$store.commit('title', 'Home')
  },
}
</script>
