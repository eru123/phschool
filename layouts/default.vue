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
  loading: {
    color: 'blue',
    height: '5px',
  },
  data() {
    return {
      clipped: false,
      drawer: null,
      fixed: false,
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
    userdata() {
      return this.$store.state.userdata
    },
  },
  async created() {
    this.$store.commit('loaded', false)
    await this.$fire.authReady()
    this.$fire.auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.$store.commit('user', user)
        if (this.user.uid) {
          await this.getUserData()
        }
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
  methods: {
    async getUserData() {
      if (this.user.uid) {
        await this.$fire.firestoreReady()
        const docRef = this.$fire.firestore
          .collection('users')
          .doc(this.user.uid)
        const doc = await docRef.get()
        const data = this.userdata
        data.uid = this.user.uid
        if (!doc.exists) {
          await docRef.set(data).then(() => {
            this.$store.commit('userdata', data)
            this.$store.commit('userdataLoaded', true)
          })
        } else {
          this.$store.commit('userdata', doc.data())
          this.$store.commit('userdataLoaded', true)
        }
      }
    },
  },
}
</script>
