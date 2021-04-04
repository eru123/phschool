<template>
  <div>
    <v-row v-if="loaded && user.email" justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <EmailVerification v-if="!user.emailVerified" />
        <ChangeName
          v-if="
            loaded && user.emailVerified && userdataLoaded && !userdata.name
          "
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
