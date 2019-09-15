<script>
// import gql from 'graphql-tag'
import axios from 'axios'
import ArticleList from '../components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  data () {
    return {
      articles: null
    }
  },
  mounted() {
    axios
      .get(`/articles`)
      .then(res => {
        const articles = res.data

        articles.forEach(article => {
          const authors = []
          article.authors.forEach(id => {
            axios
              .get(`/author/${id}`)
              .then(res => authors.push(res.data))
          })

          article.authors = authors
        })

        this.articles = articles
      })
  }
  // apollo: {
  //   articles: gql`
  //     query getArticles {
  //       articles {
  //         ...ArticleCardContent
  //       }
  //     }
  //     ${ArticleList.fragments.articleCard}
  //   `
  // }
}
</script>

<template>
  <ArticleList
    v-if="!!articles"
    v-bind="{ articles, title: 'Hello World, Meet GraphQL' }"/>
</template>
