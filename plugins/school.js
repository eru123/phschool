export default (context, inject) => {
  const msg = (msg) => console.log(`Hello ${msg}!`)
  inject('school', { hello: msg })
}
