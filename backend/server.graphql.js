const express = require('express')
const bodyParser = require('body-parser')
const merge = require('deepmerge')
const gql = require('graphql-tag')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const db = require('./database.js')

// The GraphQL schema in string form
const typeDefs = gql`
  input AuthorFilter {
    id: ID
    name: String
  }
  input ArticleFilter {
    id: ID
  }
  type Article {
    id: ID!
    title: String!
    summary: String
    body: String
    imageUrl: String
    authors(filter: AuthorFilter, skip: Int, first: Int): [Author]
    postedDate: String
  }
  type Author {
    id: ID!
    name: String!
    bio: String
    avatarUrl: String
    articles(filter: ArticleFilter, skip: Int, first: Int): [Article]
  }
  type Query {
    author (id: ID!): Author
    article (id: ID!): Article
    articles (filter: ArticleFilter, skip: Int, first: Int): [Article]
    authors (filter: AuthorFilter, skip: Int, first: Int): [Author]
  }
  type Mutation {
    updateAuthor (id: ID!, name: String!): Author
  }
`

// The resolvers
const resolvers = {
  Article: {
    authors: (root, args) => { // args = { filter, skip, first }
      // Only get authors of this article
      args = merge(args, { filter: { articles: { id: root.id } } })
      return db.getAuthors(args)
    }
  },
  Author: {
    articles: (root, args) => {  // args = { filter, skip, first }
      // Only get articles by this author
      args = merge(args, { filter: { authors: { id: root.id } } })
      return db.getArticles(args)
    }
  },
  Query: {
    author: (root, { id }) => db.getAuthor(id),
    article: (root, { id }) => db.getArticle(id),
    articles: (root, args) => db.getArticles(args), // args = { filter, skip, first }
    authors: (root, args) => db.getAuthors(args) // args = { filter, skip, first }
  },

  Mutation: {
    updateAuthor: (root, args) => db.updateAuthor(args.id, args)
  }
}

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Initialize the app
const app = express()

app.use(cors())

app.use('/assets', express.static('assets'))

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
  console.log(`Server started on at localhost:${port}. Go to http://localhost:${port}/graphiql to run queries!`)
})
