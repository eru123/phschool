<template>
  <div>
    <h1>Showcase</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  head: () => ({
    title: 'Showcase',
  }),
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.commit('title', 'Showcase')
  },
}
</script>
