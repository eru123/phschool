export const strict = false

export const state = () => ({
  title: 'Every Juan',
  user: {
    uid: null,
    email: null,
    emailVerified: null,
  },
  loaded: false,
  userdata: {
    uid: null,
    name: null,
    defaultPhoto: null,
  },
  userdataLoaded: false,
  offline: false,
  preload: [],
})

export const mutations = {
  user(state, obj) {
    const { uid, email, emailVerified } = obj
    state.user = { uid, email, emailVerified }
  },
  preload(state, item) {
    state.preload.push(item)
  },
  title(state, title) {
    state.title = title
  },
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    const { uid, email, emailVerified } = authUser
    state.user = { uid, email, emailVerified }
  },
  loaded(state, value) {
    state.loaded = Boolean(value)
  },
  userdata(state, value) {
    state.userdata = Object(value)
  },
  userdataLoaded(state, value) {
    state.userdataLoaded = Boolean(value)
  },
  offline(state, value) {
    state.offline = Boolean(value)
  },
}

export const actions = {
  preloadImage({ commit, state }, src) {
    const tmp = new Image()
    tmp.src = src
    let existsAlready = false
    state.preload.forEach((e) => {
      try {
        if (e.src === src) {
          existsAlready = true
        }
      } catch {
        // intentional empty block
      }
    })
    if (!existsAlready) commit('preload', tmp)
  },
  resetStoreState({ commit }) {
    const defaultState = {
      title: 'Every Juan',
      user: {
        uid: null,
        email: null,
        emailVerified: null,
      },
      loaded: false,
      userdata: {
        uid: null,
        name: null,
        defaultPhoto: null,
      },
      userdataLoaded: false,
      offline: false,
    }

    commit('user', defaultState.user)
    commit('userdata', defaultState.userdata)
    commit('userdataLoaded', defaultState.userdataLoaded)
  },
  async user({ commit, dispatch }, user) {
    commit('user', user)
    await dispatch('userdata', user)
  },
  async logout() {},
  async userdata({ commit, dispatch, state }, { uid }) {
    if (uid) {
      await this.$fire.firestoreReady()

      const docRef = this.$fire.firestore.collection('users').doc(uid)
      let data = state.userdata
      data.uid = uid

      docRef.onSnapshot(async (doc) => {
        if (!doc.exists) {
          await docRef.set(data)
          commit('userdata', data)
        } else {
          data = doc.data()

          if (data.defaultPhoto) {
            await this.$fire.storageReady()
            await this.$fire.storage
              .ref(data.defaultPhoto)
              .getDownloadURL()
              .then((url) => {
                data.defaultPhoto = url
                dispatch('preloadImage', url)
              })
              .catch(() => {
                data.defaultPhoto = null
              })
              .finally(() => {
                commit('userdata', data)
              })
          } else {
            commit('userdata', data)
          }
        }
        commit('userdataLoaded', true)
      })

      // await this.$fire.firestore
      //   .collection('users')
      //   .where('uid', '==', uid)
      //   .onSnapshot(async (querySnapshot) => {
      //     console.log('[DEBUG]userdata_A')

      //     if (querySnapshot.size < 1) {
      //       await docRef
      //         .set(data)
      //         .then(() => {
      //           data.defaultPhoto = null
      //           commit('userdata', data)
      //         })
      //         .catch(() => {
      //           commit('userdata', data)
      //         })
      //         .finally(() => {
      //           commit('userdataLoaded', true)
      //           console.log('[DEBUG]userdata_B')
      //         })
      //     } else {
      //       querySnapshot.forEach(async (doc) => {
      //         console.log('[DEBUG]userdata_C')

      //         if (!doc.exists) {
      //           await docRef
      //             .set(data)
      //             .then(() => {
      //               data.defaultPhoto = null
      //               commit('userdata', data)
      //             })
      //             .catch(() => {
      //               commit('userdata', data)
      //             })
      //             .finally(() => {
      //               console.log('[DEBUG]userdata_D')

      //               commit('userdataLoaded', true)
      //             })
      //         } else {
      //           data = doc.data()
      //           if (data.defaultPhoto) {
      //             console.log('[DEBUG]userdata_E')

      //             await this.$fire.storageReady()
      //             await this.$fire.storage
      //               .ref(data.defaultPhoto)
      //               .getDownloadURL()
      //               .then((url) => {
      //                 data.defaultPhoto = url
      //                 dispatch('preloadImage', url)
      //               })
      //               .catch(() => {
      //                 data.defaultPhoto = null
      //               })
      //               .finally(() => {
      //                 commit('userdata', data)
      //                 commit('userdataLoaded', true)
      //                 console.log('[DEBUG]userdata_F')
      //               })
      //           } else {
      //             data.defaultPhoto = null
      //             commit('userdata', data)
      //             commit('userdataLoaded', true)
      //             console.log('[DEBUG]userdata_G')
      //           }
      //         }
      //       })
      //     }
      //   })

      // commit('userdataLoaded', true)
    } else {
      commit('userdataLoaded', true)
    }
  },
  offline({ commit }) {
    commit('offline', navigator.offline)
    addEventListener('offline', () => {
      commit('offline', true)
    })
    addEventListener('online', () => {
      commit('offline', false)
    })
  },
}
