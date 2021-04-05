<template>
  <v-card v-if="userdataLoaded && !user.email" outlined elevation="0">
    <v-card-title> Welcome, to {{ $config.title }}! </v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, velit
      nemo ad commodi illo totam enim officia similique! Non commodi maxime et
      harum placeat consequatur sed totam ea minus impedit.
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user', 'loaded', 'userdata', 'userdataLoaded']),
  },
}
</script>
