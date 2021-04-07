<template>
  <div v-if="loaded && userdataLoaded">
    <v-list>
      <v-list-item
        v-if="user.email && user.emailVerified"
        class="text-center mt-4"
      >
        <v-spacer></v-spacer>
        <v-list-item-avatar>
          <v-img
            v-if="userdata.defaultPhoto"
            :src="userdata.defaultPhoto"
            height="50"
            width="50"
            style="
              margin: 1em auto;
              border: 1px solid #ccc;
              background: #f2f2f2;
              border-radius: 50%;
            "
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="secondary"
                  size="10"
                  width="1"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
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

      <v-dialog v-model="dialog" persistent max-width="290">
        <template #activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-card>
          <v-card-title class="headline"> Logout </v-card-title>
          <v-card-text>Are you sure you want to logout?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              No
            </v-btn>
            <v-btn color="red darken-1" text @click="logout"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-list>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Cookies from 'js-cookie'
export default {
  data: () => ({
    dialog: null,
  }),
  computed: {
    ...mapState(['loaded', 'user', 'userdata', 'userdataLoaded']),
  },
  methods: {
    async logout() {
      this.loading = true
      await this.$fire.authReady()
      await this.$fire.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('resetStoreState')
          Cookies.remove('access_token')
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          this.error = true
          this.message = error.message
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
