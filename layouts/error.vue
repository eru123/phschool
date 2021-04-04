<template>
  <v-app>
    <div class="text-center">
      <h1 class="h1 py-8">
        {{ per }}
      </h1>
    </div>
    <div class="text-center py-8">
      <NuxtLink to="/"> Back to Home</NuxtLink>
    </div>
  </v-app>
</template>

<script>
const xcode = {
  404: '404 Page Not Found',
}

const dcode = 'Unknown Error Occur'

export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    per: '',
  }),
  head() {
    const title = xcode[this.error.statusCode] ?? dcode
    return {
      title,
    }
  },
  created() {
    this.$store.commit('title', 'Error')
    this.per = xcode[this.error.statusCode] ?? dcode
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
