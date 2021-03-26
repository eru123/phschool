<template>
  <div>
    <h1>Preference</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
export default {
  head: () => ({
    title: 'Preference',
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  created() {
    this.$store.commit('title', 'Preference')
  },
}
</script>
