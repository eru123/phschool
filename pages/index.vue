<template>
  <div>
    <v-row v-if="loaded && userdataLoaded" justify="center" align="center">
      <v-col cols="12" sm="10" md="8">
        <EmailVerification />
        <ChangeName />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8">
        <WelcomeTester />
        <SkeletonLoader />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import EmailVerification from '~/components/CardEmailVerification.vue'
import ChangeName from '~/components/CardChangeName.vue'
import SkeletonLoader from '~/components/SkeletonLoader.vue'
import WelcomeTester from '~/components/CardWelcomeTester.vue'
export default {
  components: {
    EmailVerification,
    ChangeName,
    SkeletonLoader,
    WelcomeTester,
  },
  head: () => ({
    title: 'Home',
  }),
  computed: {
    ...mapState(['user', 'loaded', 'userdata', 'userdataLoaded']),
  },
  created() {
    this.$store.commit('title', 'Home')
  },
}
</script>
