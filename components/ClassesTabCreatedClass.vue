<template>
  <v-card outlined class="my-4">
    <v-card-title> Created Class</v-card-title>
    <v-card-subtitle class="pb-2">
      Created {{ cc.length }} class <v-spacer />
      <a v-if="!show" href="#" @click="show = true">Show</a>
      <a v-if="show" href="#" @click="show = false">Hide</a>
    </v-card-subtitle>
    <v-divider v-if="show"></v-divider>
    <v-list v-if="show">
      <v-list-item
        v-for="item in items"
        :key="item.code"
        :to="`/class/${item.code}`"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
            <small style="color: gray"> - {{ item.date }} </small>
          </v-list-item-title>
          <v-list-item-subtitle> {{ item.description }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="cc.length > 5">
        <v-spacer />
        <a v-if="showAll == false" href="#" @click="showAllItems"> Show All </a>
        <a v-if="showAll == true" href="#" @click="collapseItems"> Collapse </a>
        <v-spacer />
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    cc: [],
    items: [],
    show: true,
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
    showAllItems() {
      this.items = this.cc
      this.showAll = true
    },
    collapseItems() {
      this.items = this.cc.slice(0, 5)
      this.showAll = false
    },
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
