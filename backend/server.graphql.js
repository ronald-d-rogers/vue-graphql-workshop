const merge = require('deepmerge')
const { ApolloServer, gql } = require('apollo-server-express')

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
const schema = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = schema
