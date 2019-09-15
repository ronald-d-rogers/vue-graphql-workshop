<script>
// import gql from 'graphql-tag'
import axios from 'axios'
import Authors from '../components/Authors.vue'

export default {
  components: {
    Authors
  },
  data () {
    return {
      authors: null
    }
  },
  mounted () {
    axios
      .get(`/authors`)
      .then(res => {
        const authors = res.data

        authors.forEach(author => {
          const articles = []
          author.articles.forEach(id => {
            axios
              .get(`/article/${id}`)
              .then(res => {
                const article = res.data

                const authors = []
                article.authors.forEach(id => {
                  axios
                    .get(`/author/${id}`)
                    .then(res => authors.push(res.data))
                })

                article.authors = authors
                articles.push(article)
              })
          })

          author.articles = articles
        })

        this.authors = authors
      })
  }
  // apollo: {
  //   authors: gql`
  //     query getAuthors {
  //       authors {
  //         ...AuthorContent
  //       }
  //     }
  //     ${Authors.fragments.author}
  //   `
  // }
}
</script>

<template>
  <Authors
    v-if="!!authors"
    v-bind="{ authors }"/>
</template>
