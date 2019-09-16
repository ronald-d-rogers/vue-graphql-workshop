const express = require('express')
const cors = require('cors')

// Initialize the app
const app = express()

app.use(cors())

app.use('/assets', express.static('assets'))

// The REST endpoints
app.use('/v1', require('./server.rest'))

// Start the server
app.listen(3000, () => {
  console.log('Server started on at localhost:3000')
})
