<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
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
        <CreatedClass />
        <JoinedClass />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CreatedClass from '~/components/ClassesTabCreatedClass.vue'
import JoinedClass from '~/components/ClassesTabJoinedClass.vue'
export default {
  components: {
    CreatedClass,
    JoinedClass,
  },
  middleware: ['auth-only'],
  head: () => ({
    title: 'Classes',
  }),
  computed: {
    ...mapState(['user', 'loaded']),
  },
  created() {
    this.$store.commit('title', 'Classes')
  },
}
</script>
