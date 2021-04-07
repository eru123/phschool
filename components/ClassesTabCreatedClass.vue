<template>
  <v-card outlined class="my-4">
    <v-card-title> Created Class</v-card-title>
    <v-card-subtitle v-if="!loading" class="pb-2">
      Created {{ cc.length }} class <v-spacer />
      <div v-if="cc.length > 0">
        <a v-if="!show" href="#" @click="show = true">Show</a>
        <a v-if="show" href="#" @click="show = false">Hide</a>
      </div>
    </v-card-subtitle>
    <v-divider v-if="show && !loading"></v-divider>
    <v-progress-linear v-if="loading" indeterminate color="cyan">
    </v-progress-linear>
    <v-list v-if="show && !loading" class="py-0">
      <v-list-item
        v-for="item in items"
        :key="item.code"
        :to="`/class/${item.code}`"
        :title="`${item.public ? 'Public' : 'Private'} Class . ${item.date}`"
      >
        <v-list-item-icon class="mr-4">
          <v-icon v-if="item.public" color="grey darken-4"> mdi-earth </v-icon>
          <v-icon v-if="!item.public" color="grey darken-4">
            mdi-account-lock
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
          <v-list-item-subtitle> {{ item.description }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-if="cc.length > 5 && showAll == false"
        @click="showAllItems"
      >
        <v-list-item-content class="text-center">
          <v-list-item-title style="color: dodgerblue">
            Show All
          </v-list-item-title>
          <v-list-item-subtitle>Click to show all items</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="cc.length > 5 && showAll == true"
        @click="collapseItems"
      >
        <v-list-item-content class="text-center">
          <v-list-item-title style="color: dodgerblue">
            Show less
          </v-list-item-title>
          <v-list-item-subtitle>
            Click to show only 5 items
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    cc: [],
    items: [],
    show: false,
    showAll: false,
    loading: false,
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
      this.loading = true
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

          this.loading = false
        })
    },
  },
}
</script>
