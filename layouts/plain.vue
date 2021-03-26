<template>
  <v-app>
    <v-app-bar fixed elevation="0" color="light-blue darken-4" dark app>
      <v-toolbar-title v-text="title || $config.title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$store.state.title
    },
  },
}
</script>
<style>
* {
  outline: none;
  user-select: none;
}
a {
  cursor: pointer;
  text-decoration: none;
}
</style>
