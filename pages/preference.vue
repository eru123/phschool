<template>
  <div>
    <h1>Preference</h1>
    <p>Intentioanlly left blank</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  head: () => ({
    title: 'Preference',
  }),
  computed: {
    ...mapState(['user']),
  },
  created() {
    this.$store.commit('title', 'Preference')
  },
}
</script>
