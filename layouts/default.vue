<template>
  <v-app>
    <v-navigation-drawer v-if="loaded" v-model="drawer" clipped app fixed>
      <LeftMenu />
    </v-navigation-drawer>
    <v-app-bar
      color="light-blue darken-4"
      elevation="0"
      dark
      clipped-left
      clipped-right
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="loaded" @click.stop="drawer = !drawer" />
      <v-toolbar-title
        v-if="loaded && user.email"
        class="ml-1"
        v-text="title"
      />
      <v-toolbar-title
        v-if="loaded && !user.email"
        class="ml-1"
        v-text="$config.title"
      />
      <v-spacer />
      <v-btn
        v-if="userdataLoaded && user.email"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn
        v-if="loaded && !user.email"
        light
        color="white"
        to="/login"
        router
        exact
      >
        Login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-if="user.email && userdataLoaded"
      v-model="rightDrawer"
      right
      clipped
      app
    >
      <RightMenu />
    </v-navigation-drawer>
    <v-footer
      v-if="offline"
      padless
      color="secondary"
      class="text-center"
      dark
      app
    >
      <v-spacer />
      <small>You are offline</small>
      <v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import RightMenu from '~/components/NavDefaultRightMenu.vue'
import LeftMenu from '~/components/NavDefaultLeftMenu.vue'

export default {
  components: {
    RightMenu,
    LeftMenu,
  },
  data() {
    return {
      clipped: false,
      drawer: null,
      fixed: false,
      miniVariant: false,
      rightDrawer: false,
    }
  },
  computed: {
    ...mapState([
      'title',
      'user',
      'loaded',
      'userdata',
      'userdataLoaded',
      'offline',
    ]),
  },
  async created() {
    await this.$fire.authReady()
    this.$store.commit('loaded', false)

    console.log(this.$fire.auth.currentUser)

    this.$fire.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.$store.commit('loaded', false)
        this.$store.commit('userdataLoaded', false)
        await this.$store.dispatch('user', user)
      } else {
        this.$store.commit('userdataLoaded', true)
        this.$store.commit('user', {
          uid: null,
          email: null,
          emailVerified: null,
        })
      }
      this.$store.commit('loaded', true)
    })

    if (process.client) {
      this.$store.dispatch('offline')
    }
  },
}
</script>
