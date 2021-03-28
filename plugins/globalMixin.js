import Vue from 'vue'

if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    computed: {
      title() {
        return this.$store.state.title
      },
      user() {
        return this.$store.state.user
      },
      loaded() {
        return this.$store.state.loaded
      },
    },
  }) // Set up your mixin then
}
