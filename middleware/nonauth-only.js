import * as firebase from '~/plugins/firebase'
import { getUserFromCookie } from '~/helpers'

export default function ({ req, store, redirect }) {
  if (process.server) {
    const user = getUserFromCookie(req)
    if (user) {
      store.commit('user', user)
      redirect('/')
    }
  } else {
    const user = firebase.auth.currentUser
    if (user) {
      store.commit('user', user)
      redirect('/')
    }
  }
}
