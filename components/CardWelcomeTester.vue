<template>
  <v-card
    v-if="loaded && userdataLoaded && userdata.name"
    outlined
    elevation="0"
  >
    <v-card-title> Welcome, {{ userdata.name }}! </v-card-title>
    <v-card-text>
      Salamat kaibigan sa pagpapaunlak na subukan ang app na ito. Click mo lang
      yung account icon tas bandang taas, tas click mo yung account tab, then
      send a screenshot, then try to upload a profile picture then send mo ulit
      ang screen shot. yun lang, maraming salamat
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
