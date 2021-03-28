<template>
  <div>
    <v-list>
      <v-list-item
        v-if="user.email && user.emailVerified"
        class="text-center mt-4"
      >
        <v-spacer></v-spacer>
        <v-list-item-avatar>
          <img v-if="userdata.defaultPhoto" :src="userdata.defaultPhoto" />
          <v-icon v-if="!userdata.defaultPhoto" size="50"
            >mdi-account-circle</v-icon
          >
        </v-list-item-avatar>
        <v-spacer></v-spacer>
      </v-list-item>
      <v-list-item class="text-center">
        <v-list-item-content>
          <v-list-item-title v-if="userdata.name">
            {{ userdata.name }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="user.email">
            {{ user.email }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-if="!user.emailVerified">
            Not verified
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list dense rounded>
      <v-list-item
        v-if="user.email && user.emailVerified"
        to="/account"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-account-edit</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Account</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="user.email && user.emailVerified"
        to="/preference"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Preference</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/logout" router exact>
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  data: () => ({
    accountItems: [
      {
        icon: 'mdi-account-edit',
        title: 'Account',
        to: '/account',
      },
      {
        icon: 'mdi-cog',
        title: 'Preference',
        to: '/preference',
      },
      {
        icon: 'mdi-logout',
        title: 'Logout',
        to: '/logout',
      },
    ],
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
    userdata() {
      return this.$store.state.userdata
    },
  },
}
</script>
