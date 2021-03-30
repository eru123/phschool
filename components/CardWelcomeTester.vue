<template>
  <v-card v-if="loaded && user.email" outlined elevation="0" class="my-4">
    <v-card-title> Welcome </v-card-title>
    <v-card-text>
      Salamat kaibigan sa pagpapaunlak na subukan ang app na ito. Click mo lang
      yung account icon tas bandang taas, tas click mo yung account tab, then
      send a screenshot, then try to upload a profile picture then send mo ulit
      ang screen shot. yun lang, maraming salamat
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
    loaded() {
      return this.$store.state.loaded
    },
  },
}
</script>
