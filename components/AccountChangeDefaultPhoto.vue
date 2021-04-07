<template>
  <v-card outlined class="my-4">
    <v-card-title>Default Photo</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="text-center">
      <v-img
        v-if="userdata.defaultPhoto"
        :src="userdata.defaultPhoto"
        height="200"
        width="200"
        style="
          margin: 1em auto;
          border: 1px solid #ccc;
          background: #f2f2f2;
          border-radius: 50%;
        "
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="secondary"
              size="50"
              width="1"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-icon v-if="!userdata.defaultPhoto" size="200">
        mdi-account-circle
      </v-icon>
      <v-card-actions>
        <v-spacer />
        <v-dialog v-model="dialog" persistent width="500">
          <template #activator="{ on, attrs }">
            <v-btn elevation="0" color="primary" dark v-bind="attrs" v-on="on">
              Upload
            </v-btn>
          </template>
          <v-card>
            <v-card-title> Upload Profile Picture </v-card-title>
            <v-divider />
            <v-card-text class="text-center mt-4">
              <div class="text-center">
                <v-img
                  v-if="img1 != null"
                  :src="img1"
                  height="200"
                  width="200"
                  style="
                    margin: 1em auto;
                    border: 1px solid #ccc;
                    background: #f2f2f2;
                    border-radius: 50%;
                  "
                />
                <v-card
                  v-if="error"
                  color="red"
                  class="my-8"
                  dark
                  elevation="0"
                >
                  <v-card-title>
                    {{ error }}
                  </v-card-title>
                </v-card>
                <input
                  ref="input1"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="previewImage"
                />
                <v-btn
                  v-if="!loading"
                  elevation="0"
                  color="primary"
                  @click="click1"
                >
                  Select Image
                </v-btn>
              </div>
              <v-progress-circular
                v-if="uploadValue"
                :rotate="360"
                :size="100"
                :width="15"
                :value="uploadValue"
                color="teal"
                class="my-8"
              >
                {{ Math.floor(uploadValue) }}
              </v-progress-circular>
              <v-progress-circular
                v-if="updateData"
                :size="50"
                color="primary"
                indeterminate
                class="my-8"
              ></v-progress-circular>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                :disabled="loading"
                dark
                text
                @click="dialog = false"
              >
                Cancel
              </v-btn>
              <v-btn color="primary" :disabled="loading" text @click="onUpload">
                Upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer />
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>
<script>
import { v1 as uuid } from 'uuid'
export default {
  data: () => ({
    dialog: false,
    uploadValue: 0,
    imageData: null,
    img1: null,
    error: '',
    loading: false,
    updateData: false,
    meta: {
      authorId: '',
      author: '',
    },
  }),
  computed: {
    userdata() {
      return this.$store.state.userdata
    },
    user() {
      return this.$store.state.user
    },
  },
  async created() {
    await this.$fire.storageReady()
    await this.$fire.firestoreReady()
  },
  methods: {
    click1() {
      this.$refs.input1.click()
    },

    previewImage(event) {
      this.error = ''
      this.uploadValue = 0
      this.img1 = null
      this.imageData = event.target.files[0]
      if (FileReader && this.imageData) {
        const fr = new FileReader()
        fr.onload = () => {
          this.img1 = fr.result
        }
        this.error = ''
        fr.readAsDataURL(this.imageData)
      } else {
        this.img1 = null
        this.error = 'Invalid image'
      }
    },
    async onUpload() {
      this.img1 = null
      this.uploadValue = 1
      this.loading = true
      this.updateData = false
      this.meta = {
        authorId: this.user?.uid,
        author: this.userdata?.name,
      }
      const refId = `profile/${uuid()}`
      await this.$fire.storageReady()
      const storageRef = this.$fire.storage
        .ref(refId)
        .put(this.imageData, this.meta)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          if (this.uploadValue < 1) {
            this.uploadValue = 1
          }
        },
        (e) => {
          this.error = e.message
          this.loading = false
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
            this.img1 = null
            this.imageData = null
            this.uploadValue = 0
            const ndata = this.userdata
            ndata.defaultPhoto = refId

            await this.updateUserData(url, ndata)
          })
        }
      )
    },
    async updateUserData(url, data) {
      this.loading = true
      this.updateData = true
      this.error = ''

      await this.$fire.firestoreReady()
      const docRef = this.$fire.firestore.collection('users').doc(this.user.uid)
      const doc = await docRef.get()
      if (!doc.exists) {
        await docRef
          .set(data)
          .then(() => {
            this.dialog = false
          })
          .catch((e) => {
            this.error = e.message
          })
          .finally(() => {
            this.loading = false
            this.updateData = false
          })
      } else {
        await docRef
          .set({ defaultPhoto: data.defaultPhoto }, { merge: true })
          .then(() => {
            this.dialog = false
          })
          .catch((e) => {
            this.error = e.message
          })
          .finally(() => {
            this.loading = false
            this.updateData = false
          })
      }
    },
  },
}
</script>
