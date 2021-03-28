<template>
  <div>
    <h1>Join Class</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Join Class',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Join Class')
  },
}
</script>
