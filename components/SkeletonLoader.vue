<template>
  <div>
    <v-card v-if="!userdataLoaded" outlined elevation="0" class="my-4">
      <v-skeleton-loader type="article, actions"> </v-skeleton-loader>
    </v-card>
    <v-card v-if="!userdataLoaded" outlined elevation="0" class="my-4">
      <v-skeleton-loader
        type="table-heading, list-item-two-line, image, table-tfoot"
      >
      </v-skeleton-loader>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userdataLoaded']),
  },
}
</script>
