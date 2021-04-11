<template>
  <v-row justify="center" align="center">
    <v-col v-if="!error" cols="12" sm="10" md="8" class="my-4">
      <v-card elevation="0" class="mb-4">
        <v-card-actions class="m-0 px-0">
          <v-btn
            v-if="userdataLoaded"
            elevation="0"
            color="primary"
            to="/classes"
            router
            exact
          >
            Classes
          </v-btn>
          <v-spacer />
          <ClassMembers v-if="userdataLoaded" :code="{ code, creatorId }" />
          <EditClass v-if="userdataLoaded" />
        </v-card-actions>
      </v-card>
      <v-card v-if="userdataLoaded" outlined class="mb-4">
        <v-card-title>
          {{ title }}
          <div class="ml-2 text-small">
            <span v-if="pending.includes(user.uid)">PENDING</span>
            <span v-if="accepted.includes(user.uid)">ACCEPTED</span>
            <span v-if="admins.includes(user.uid)">ADMIN</span>
            <span v-if="moderators.includes(user.uid)">MODERATOR</span>
            <span v-if="creatorId == user.uid">CREATOR</span>
          </div>
        </v-card-title>
        <v-card-subtitle>
          <div>
            <v-chip
              title="Class admins"
              class="mr-1"
              color="#3e4444"
              label
              text-color="white"
              small
            >
              <v-icon left size="16"> mdi-account-cog </v-icon>
              {{ admins.length }}
            </v-chip>
            <v-chip
              title="Class moderators"
              class="mr-1"
              color="#feb236"
              label
              text-color="white"
              small
            >
              <v-icon left size="16"> mdi-account-details </v-icon>
              {{ moderators.length }}
            </v-chip>
            <v-chip
              title="Accepted students"
              class="mr-1"
              color="#4040a1"
              label
              text-color="white"
              small
            >
              <v-icon left size="16"> mdi-account-check </v-icon>
              {{ accepted.length }}
            </v-chip>
            <v-chip
              v-if="creatorId == user.uid && pending.length"
              title="Pending students"
              class="mr-1"
              color="#f7786b"
              label
              text-color="white"
              small
            >
              <v-icon left size="16"> mdi-account-clock </v-icon>
              {{ pending.length }}
            </v-chip>
          </div>
          <div>{{ date }}</div>
        </v-card-subtitle>
        <v-card-text>
          {{ description }}
        </v-card-text>
      </v-card>
      <v-card v-if="userdataLoaded" outlined class="mb-4">
        <v-card-title> Class Code</v-card-title>
        <v-card-text> {{ code }} </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            v-clipboard:copy="code"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
            elevation="0"
            color="success"
          >
            COPY
          </v-btn>
        </v-card-actions>
        <v-snackbar
          v-model="snackbar.show"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
          right
          bottom
        >
          {{ snackbar.text }}

          <template #action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar.show = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
      <SkeletonLoader />
    </v-col>
    <v-col v-if="error" cols="12" sm="10" md="8" class="my-4">
      <v-card elevation="0">
        <v-btn
          elevation="0"
          class="mb-4"
          color="primary"
          to="/classes"
          router
          exact
        >
          Back to Classes
        </v-btn>
      </v-card>
      <v-card outlined>
        <v-card-title>Invalid Class</v-card-title>
        <v-card-subtitle>
          Failed to retrieve class information or the class doesn't exists
        </v-card-subtitle>
        <v-card-text> {{ error }} </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" elevation="0" @click="$router.go(0)">
            Reload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import EditClass from '~/components/ClassEditDialog.vue'
import ClassMembers from '~/components/ClassMembersDialog.vue'
export default {
  components: {
    EditClass,
    ClassMembers,
  },
  async asyncData({ $fire, route }) {
    let data = {
      error: '',
      title: '',
      description: '',
    }
    try {
      const code = route.params.code
      await $fire.firestoreReady()
      const db = $fire.firestore
      const docRef = db.collection('classes').doc(code)
      return await docRef.get().then((doc) => {
        if (doc.exists) {
          const docData = doc.data()
          data = { ...docData, error: data.error }
        } else {
          data.error = 'Class not found'
        }
        return { ...data }
      })
    } catch {
      data.error = 'Failed to retrieve data'
    }
    return { ...data }
  },
  data: () => ({
    snackbar: {
      show: false,
      text: '',
      timeout: 2000,
      color: '',
    },
    admins: [],
    pending: [],
    accepted: [],
    moderators: [],
    error: '',
    title: '',
    description: '',
    code: '',
  }),
  head() {
    return {
      title: this.title || 'Class',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
  computed: {
    ...mapState(['loaded', 'user', 'userdataLoaded']),
  },
  async created() {
    if (!this.error) {
      await this.$fire.firestoreReady()
      this.admins = await this.getMembers('admins')
      this.pending = await this.getMembers('pending')
      this.accepted = await this.getMembers('accepted')
      this.moderators = await this.getMembers('moderators')
    }
  },
  methods: {
    onCopy(e) {
      this.snackbar.show = true
      this.snackbar.text = 'Code copied!'
      this.snackbar.color = 'success'
    },
    onError(e) {
      this.snackbar.show = true
      this.snackbar.text = 'Code failed copied!'
      this.snackbar.color = 'warning'
    },
    async getMembers(coll) {
      let res = []
      await this.$fire.firestore
        .collection('classes')
        .doc(this.code)
        .collection('members')
        .where('status', '==', coll)
        .onSnapshot((doc) => {
          try {
            if (doc.size > 0) {
              doc.forEach((e) => {
                if (e.exists) {
                  res.push(e.data().uid)
                }
              })
            }
          } catch {
            res = []
          }
        })
      return res
    },
  },
}
</script>
