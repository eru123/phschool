<template>
  <div>
    <h1>Showcase</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Showcase',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Showcase')
  },
}
</script>
