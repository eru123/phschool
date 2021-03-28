<template>
  <div>
    <h1>Create Class</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Create Class',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Create Class')
  },
}
</script>
