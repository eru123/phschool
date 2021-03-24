<template>
  <v-app>
    <v-app-bar dense fixed elevation="0" color="light-blue darken-4" dark app>
      <v-toolbar-title v-text="$config.title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
