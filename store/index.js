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
}
