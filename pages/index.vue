<template>
  <div>
    <v-row v-if="loaded && user.email" justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <EmailVerification v-if="!user.emailVerified" />
        <ChangeName
          v-if="loaded && user.emailVerified && userdata.uid && !userdata.name"
        />
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <WelcomeTester />
        <SkeletonLoader />
      </v-col>
    </v-row>
  </div>
</template>
<script>
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
    user() {
      return this.$store.state.user
    },
    loaded() {
      return this.$store.state.loaded
    },
    userdata() {
      return this.$store.state.userdata
    },
  },
  created() {
    this.$store.commit('title', 'Home')
  },
}
</script>
