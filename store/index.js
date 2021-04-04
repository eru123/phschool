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
})

export const mutations = {
  user(state, obj) {
    const { uid, email, emailVerified } = obj
    state.user = { uid, email, emailVerified }
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
}

export const actions = {
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
  async userdata({ commit, state }, { uid }) {
    commit('userdataLoaded', false)

    if (uid) {
      await this.$fire.firestoreReady()

      const docRef = this.$fire.firestore.collection('users').doc(uid)

      let data = state.userdata
      data.uid = uid

      this.$fire.firestore
        .collection('users')
        .where('uid', '==', uid)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            if (!doc.exists) {
              await docRef.set(data).then(() => {
                data.defaultPhoto = null
                commit('userdata', data)
                commit('userdataLoaded', true)
              })
            } else {
              data = doc.data()
              if (data.defaultPhoto) {
                await this.$fire.storageReady()
                await this.$fire.storage
                  .ref(data.defaultPhoto)
                  .getDownloadURL()
                  .then((url) => {
                    data.defaultPhoto = url
                  })
                  .catch(() => {
                    data.defaultPhoto = null
                  })
                  .finally(() => {
                    commit('userdata', data)
                    commit('userdataLoaded', true)
                  })
              } else {
                data.defaultPhoto = null
                commit('userdata', data)
                commit('userdataLoaded', true)
              }
            }
          })
        })
    } else {
      commit('userdataLoaded', true)
    }
  },
}
