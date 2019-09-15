const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphiqlExpress } = require('apollo-server-express')

// Initialize the app
const app = express()

app.use(cors())

app.use('/assets', express.static('assets'))

// The REST endpoints
app.use('/v1', require('./server.rest'));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), require('./server.graphql'))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// Start the server
app.listen(3000, () => {
  console.log('Server started on at localhost:3000. Go to http://localhost:3000/graphiql to run queries!')
})
