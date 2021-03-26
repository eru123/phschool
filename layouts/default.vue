<template>
  <v-app>
    <v-navigation-drawer v-if="user.email" v-model="drawer" app fixed>
      <v-list v-if="user.email" dense rounded>
        <v-list-item
          v-for="(item, i) in mainItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="light-blue darken-4" elevation="0" dark fixed app>
      <v-app-bar-nav-icon v-if="user.email" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn v-if="user.email" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn v-if="!user.email" light color="white" to="/login" router exact>
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
      fixed
    >
      <template #prepend>
        <v-list-item class="text-center">
          <v-spacer></v-spacer>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>
          <v-spacer></v-spacer>
        </v-list-item>
        <v-list-item class="text-center">
          <v-list-item-content>
            <v-list-item-title>{{ user.email }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.emailVerified ? 'Verified' : 'Not verified' }}
            </v-list-item-subtitle></v-list-item-content
          ></v-list-item
        >
      </template>
      <v-divider></v-divider>
      <v-list dense rounded>
        <v-list-item
          v-for="item in accountItems"
          :key="item.title"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: null,
      fixed: false,
      mainItems: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-account-group',
          title: 'Classes',
          to: '/classes',
        },
        {
          icon: 'mdi-movie-open',
          title: 'Talent Showcase',
          to: '/showcase',
        },
      ],
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
  },
  async created() {
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
    })
  },
}
</script>
