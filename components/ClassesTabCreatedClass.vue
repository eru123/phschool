<template>
  <v-card outlined class="my-4">
    <v-card-title>Created Class</v-card-title>
    <v-card-subtitle>Created 54 class <v-spacer /></v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    items: [],
  }),
  created() {
    this.getAllCreatedClass()
  },
  methods: {
    async getAllCreatedClass() {},
  },
}
</script>
