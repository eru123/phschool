<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="primary"
        elevation="0"
        title="Class Members"
        class="ml-4 px-0"
        dark
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary" elevation="0">
        <v-btn :disabled="loading" icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="pl-2">Members</v-toolbar-title>
        <v-spacer />
        <v-select
          v-model="selectedStatus"
          :disabled="loading"
          :loading="loading"
          :items="status"
          append-icon="mdi-menu-open"
          menu-props="auto"
          hide-details
          label="Member Type"
          dense
          single-line
          style="max-width: 150px"
        />
      </v-toolbar>
      <v-list v-if="members[selectedStatus]">
        <v-list-item
          v-for="(item, key) in members[selectedStatus]"
          :key="item.uid"
        >
          <v-list-item-title :title="item.name">
            {{ item.name }}
          </v-list-item-title>
          <v-list-item-action v-if="status && editable" class="my-0">
            <v-select
              v-model="members[selectedStatus][key].status"
              :disabled="loading"
              :items="status"
              append-icon="mdi-account"
              menu-props="auto"
              hide-details
              label="Change"
              dense
              single-line
              style="max-width: 150px"
              @change="update(members[selectedStatus][key])"
            ></v-select>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    code: {
      type: Object,
      default: () => ({
        code: null,
        creatorId: null,
      }),
    },
  },
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    selectedStatus: 'accepted',
    status: ['accepted', 'pending', 'moderators', 'admins'],
    members: {
      students: [],
      pending: [],
      rejected: [],
      banned: [],
      admins: [],
      moderators: [],
    },
    editable: false,
    currentItemsCount: 0,
    loading: false,
  }),
  computed: {
    ...mapState(['user', 'userdata', 'loaded', 'userdataLoaded']),
  },
  watch: {
    members(n, o) {
      console.log(n, o)
    },
  },
  async created() {
    await this.getData('accepted')
    await this.getData('pending')
    await this.getData('admins')
    await this.getData('moderators')
    this.test()
  },
  methods: {
    async getData(field) {
      this.loading = true
      await this.$fire.firestoreReady()
      await this.$fire.firestore
        .collection('classes')
        .doc(this.code.code)
        .collection('members')
        .where('status', '==', field)
        .onSnapshot((snaps) => {
          this.loading = true
          const tmp = []
          snaps.forEach(async (doc) => {
            if (doc.exists) {
              let data = doc.data()
              await this.$fire.firestore
                .collection('users')
                .where('uid', '==', data.uid)
                .onSnapshot((snapsa) => {
                  let dataa = null
                  snapsa.forEach((doca) => {
                    if (doca.exists) dataa = doca.data()
                    data = { ...data, name: dataa.name }
                  })
                  if (dataa) tmp.push(data)
                })
            }
          })
          this.members[field] = tmp
          this.loading = false
        })
    },
    test() {
      console.log(this.members.key())
    },
    upr() {
      this.currentItemsCount = this.members[this.selectedStatus].length || 0

      let editable = false
      if (this.code.creatorId === this.user.uid) {
        editable = true
      } else {
        // let mstat = null
        // this.members.keys()
      }

      this.editable = editable
    },
    update(data) {
      console.log('update', data)
    },
  },
}
</script>
