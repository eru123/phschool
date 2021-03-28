<template>
  <v-app>
    <v-navigation-drawer
      v-if="loaded && user.email"
      v-model="drawer"
      clipped
      app
      fixed
    >
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
      <v-app-bar-nav-icon
        v-if="loaded && user.email"
        @click.stop="drawer = !drawer"
      />
      <v-toolbar-title v-if="loaded && user.email" v-text="title" />
      <v-toolbar-title v-if="loaded && !user.email" v-text="$config.title" />
      <v-spacer />
      <v-btn v-if="user.email" icon @click.stop="rightDrawer = !rightDrawer">
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
      v-if="user.email"
      v-model="rightDrawer"
      right
      temporary
      app
    >
      <RightMenu />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  computed: {
    title() {
      return this.$store.state.title
    },
    user() {
      return this.$store.state.user
    },
    loaded() {
      return this.$store.state.loaded
    },
  },
  async created() {
    this.$store.commit('loaded', false)
    await this.$fire.authReady()
    this.$fire.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('user', user)
      } else {
        this.$store.commit('user', {
          uid: null,
          email: null,
          emailVerified: null,
        })
      }
      this.$store.commit('loaded', true)
    })
  },
}
</script>
