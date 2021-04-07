<template>
  <v-row v-if="loaded && user.email" justify="center" align="center">
    <v-col cols="12" sm="10" md="8" class="my-4">
      <v-card v-if="userdataLoaded" elevation="0">
        <v-card-actions>
          <v-spacer />
          <v-btn
            :disabled="loading"
            elevation="0"
            color="red"
            dark
            to="/classes"
            router
            exact
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="userdataLoaded" class="my-4" outlined>
        <v-card-title> Join Class </v-card-title>
        <v-card-subtitle> Input the class code </v-card-subtitle>
        <v-divider v-if="!error" />
        <v-card v-if="error" elevation="0" tile color="red" dark>
          <v-card-text class="text-center" tile> {{ error }} </v-card-text>
        </v-card>
        <v-form @submit.prevent="joinClass">
          <v-card-text>
            <v-text-field
              v-model="classCode"
              label="Code"
              :loading="loading"
              :disabled="loading"
              hide-details="auto"
              autocomplete="off"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="loading || offline"
              elevation="0"
              type="submit"
              color="primary"
            >
              JOIN
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <SkeletonLoader />
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import SkeletonLoader from '~/components/SkeletonLoader.vue'
export default {
  components: {
    SkeletonLoader,
  },
  middleware: ['auth-only'],
  data: () => ({
    classCode: '',
    loading: false,
    error: '',
  }),
  head() {
    return {
      title: 'Join Class',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Join to your class now',
        },
      ],
    }
  },
  computed: {
    ...mapState(['loaded', 'user', 'userdataLoaded', 'offline']),
  },
  created() {
    this.$store.commit('title', 'Join Class')
  },
  methods: {
    async joinClass() {
      await this.$fire.firestoreReady()
      this.loading = true
      this.error = ''
      await this.$fire.firestore
        .collection('classes')
        .where('code', '==', this.classCode)
        .onSnapshot((qs) => {
          try {
            if (qs.size === 1) {
              qs.forEach(async (doc) => {
                if (doc.exists) {
                  const data = doc.data()
                  if (data.creatorID === this.user.uid) {
                    this.$router.push(`/class/${this.classCode}`)
                  } else {
                    await this.$fire.firestore
                      .collection('classes')
                      .doc(this.classCode)
                      .collection('members')
                      .where('uid', '==', this.user.uid)
                      .onSnapshot(async (qz) => {
                        try {
                          if (qz.size === 1) {
                            await this.$fire.firestore
                              .collection('users')
                              .doc(this.user.uid)
                              .collection('jclass')
                              .doc(this.classCode)
                              .set({ code: this.classCode }, { merge: true })
                            this.$router.push(`/class/${this.classCode}`)
                          } else if (qz.size < 1 && data.public) {
                            await this.$fire.firestore
                              .collection('classes')
                              .doc(this.classCode)
                              .collection('members')
                              .doc(this.user.uid)
                              .set({ uid: this.user.uid, status: 'accepted' })
                              .then(async () => {
                                await this.$fire.firestore
                                  .collection('users')
                                  .doc(this.user.uid)
                                  .collection('jclass')
                                  .doc(this.classCode)
                                  .set(
                                    { code: this.classCode },
                                    { merge: true }
                                  )
                                this.$router.push(`/class/${this.classCode}`)
                              })
                          } else if (qz.size < 1 && !data.public) {
                            await this.$fire.firestore
                              .collection('classes')
                              .doc(this.classCode)
                              .collection('members')
                              .doc(this.user.uid)
                              .set({ uid: this.user.uid, status: 'pending' })
                              .then(async () => {
                                await this.$fire.firestore
                                  .collection('users')
                                  .doc(this.user.uid)
                                  .collection('jclass')
                                  .doc(this.classCode)
                                  .set(
                                    { code: this.classCode },
                                    { merge: true }
                                  )
                                this.$router.push(`/class/${this.classCode}`)
                                this.$router.push(`/class/${this.classCode}`)
                              })
                          } else throw new Error(' >> I Love You <3 << ')
                        } catch {
                          this.error = 'Failed to join the class'
                        }
                      })
                  }
                } else {
                  this.error = "Class doesn't exists"
                }
              })
            } else {
              this.error = 'Class not found'
            }
          } catch (e) {
            console.log(e)
            this.error = 'Failed to find your class, try again later'
          }
          this.loading = false
        })
    },
  },
}
</script>
