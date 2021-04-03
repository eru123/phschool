<template>
  <v-card outlined class="my-4">
    <v-card-title>Created Class</v-card-title>
    <v-card-subtitle>
      Created {{ cc.length }} class <v-spacer />
    </v-card-subtitle>
    <v-list>
      <v-list-item v-for="item in items" :key="item.code">
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    cc: [],
    items: [],
    showAll: false,
  }),
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  async created() {
    await this.getAllCreatedClass()
  },
  methods: {
    async getAllCreatedClass() {
      await this.$fire.firestoreReady()
      let cc = []

      this.$fire.firestore
        .collection('classes')
        .where('creatorId', '==', this.user.uid)
        .onSnapshot((querySnapshot) => {
          cc = []

          querySnapshot.forEach((doc) => {
            cc.push(doc.data())
          })

          this.cc = cc
          if (this.showAll) {
            this.items = cc
          } else {
            this.items = cc.slice(0, 5)
          }
        })
    },
  },
}
</script>
