<template>
  <v-card outlined class="my-4">
    <v-card-title>Joined Class</v-card-title>
    <v-card-subtitle v-if="!loading" class="pb-2">
      Joined {{ jc.length || 0 }} class <v-spacer />
      <div v-if="jc.length > 0">
        <a v-if="!show" href="#" @click="btnShow">Show</a>
        <a v-if="show" href="#" @click="btnShow">Hide</a>
      </div>
    </v-card-subtitle>
    <v-divider v-if="show && !loading"></v-divider>
    <v-progress-linear v-if="loading" indeterminate color="teal">
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
            <small style="color: gray">
              - <b> {{ item.status }} </b>
            </small>
          </v-list-item-title>
          <v-list-item-subtitle> {{ item.description }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <div v-if="jc.length > 5">
        <v-list-item v-if="showAll == false" @click="btnShowAll">
          <v-list-item-content class="text-center">
            <v-list-item-title style="color: dodgerblue">
              Show All
            </v-list-item-title>
            <v-list-item-subtitle>Click to show all items</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="showAll == true" @click="btnShowAll">
          <v-list-item-content class="text-center">
            <v-list-item-title style="color: dodgerblue">
              Show less
            </v-list-item-title>
            <v-list-item-subtitle>
              Click to show only 5 items
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    jc: [],
    items: [],
    loading: false,
    show: false,
    showAll: false,
  }),
  computed: {
    ...mapState(['user', 'loaded', 'userdata', 'userdataLoaded']),
  },
  created() {
    this.getJoinedClassList()
  },
  methods: {
    async getJoinedClassList() {
      this.loading = true
      const jcl = []
      const jca = []
      let ntp = null
      try {
        await this.$fire.firestoreReady()
        await this.$fire.firestore
          .collection('users')
          .doc(this.user.uid)
          .collection('jclass')
          .onSnapshot((snaps) => {
            this.loading = true

            snaps.forEach((doc) => {
              if (doc.exists) {
                const data = doc.data()
                if (data.code) jcl.push(data.code)
              }
            })
            if (jcl.length > 0) {
              jcl.forEach(async (i) => {
                this.loading = true
                await this.$fire.firestore
                  .collection('classes')
                  .where('code', '==', i)
                  .onSnapshot((snaps) => {
                    this.loading = true

                    snaps.forEach(async (doc) => {
                      if (doc.exists) {
                        const data = doc.data()
                        this.loading = true
                        await this.$fire.firestore
                          .collection('classes')
                          .doc(data.code)
                          .collection('members')
                          .where('uid', '==', this.user.uid)
                          .onSnapshot((doc) => {
                            ntp = null
                            doc.forEach((stat) => {
                              ntp = stat.data()
                            })
                            if (ntp) {
                              jca.push({
                                ...data,
                                status: ntp.status
                                  .toLocaleString()
                                  .toUpperCase(),
                              })
                            }
                            this.loading = false
                          })
                      }
                    })
                    this.loading = false
                  })
              })
              this.jc = jca
              if (this.show && !this.showAll) {
                this.items = this.jc.slice(0, 5)
              } else if (this.show && this.showAll) {
                this.items = this.jc
              } else {
                this.items = []
              }
              this.loading = false
            } else {
              this.loading = false
            }
          })
      } catch {
        this.loading = false
      }
    },
    btnShow() {
      this.show = !this.show
      if (this.show) {
        this.items = this.jc.slice(0, 5)
      } else {
        this.items = []
      }
    },
    btnShowAll() {
      this.showAll = !this.showAll
      if (this.show) {
        if (this.showAll) {
          this.items = this.jc
        } else {
          this.items = this.jc.slice(0, 5)
        }
      } else {
        this.items = []
      }
    },
  },
}
</script>
