import * as firebase from '~/plugins/firebase'
import { getUserFromCookie } from '~/helpers'

export default function ({ req, store, redirect }) {
  if (process.server) {
    const user = getUserFromCookie(req)
    const url =
      typeof req.url === 'string' && req.url !== '/'
        ? `?redirect=${req.url}`
        : '?redirect=/'
    if (!user) {
      store.commit('user', { uid: null, email: null, emailVerified: null })
      redirect(`/login${url}`)
    } else {
      const { uid, email, emailVerified } = user
      store.commit('user', { uid, email, emailVerified })
    }
  } else {
    const user = firebase.auth.currentUser
    if (!user) {
      store.commit('user', { uid: null, email: null, emailVerified: null })
      redirect(`/login`)
    } else {
      const { uid, email, emailVerified } = user
      store.commit('user', { uid, email, emailVerified })
    }
  }
}
