<template>
  <div><h1>Code</h1></div>
</template>
<script>
// import firebase from '~/plugins/firebase'
export default {
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
  head() {
    return {
      title: this.title + ' - class by ' + this.creatorName,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description,
        },
      ],
    }
  },
}
</script>
