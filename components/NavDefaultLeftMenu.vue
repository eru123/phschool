<template>
  <div>
    <v-list dense rounded>
      <v-list-item to="/" router exact>
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Homepage</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="user.emailVerified" to="/classes" router exact>
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
    <v-list v-if="user.email && !user.emailVerified">
      <v-list-item>
        <v-spacer />
        <div class="text-center my-8" color="secondary">
          Verify your email first <br />
          to use this service
        </div>
        <v-spacer />
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>
