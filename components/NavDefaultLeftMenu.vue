<template>
  <div v-if="loaded">
    <v-list dense rounded>
      <v-list-item to="/" router exact>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Homepage</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="loaded && userdataLoaded && user.emailVerified"
        to="/classes"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Classes</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/showcase" router exact>
        <v-list-item-action>
          <v-icon>mdi-movie-open</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Showcase</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['loaded', 'user', 'userdataLoaded']),
  },
}
</script>
