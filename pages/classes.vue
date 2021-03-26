<template>
  <div>
    <h1>Classes</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Account',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Account')
  },
}
</script>
