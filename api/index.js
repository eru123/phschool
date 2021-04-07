const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('okokokokok')
})

module.exports = {
  path: '/api/',
  handler: app,
}
