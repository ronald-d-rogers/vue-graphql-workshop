<script>
import gql from 'graphql-tag'
import { mapActions } from 'vuex'
import ArticleList from '../components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  methods: {
    ...mapActions(['fetchArticles'])
  },
  created() {
    this.fetchArticles()
  },
  apollo: {
    articles: gql`
      query getArticles {
        articles {
          id
          title
          imageUrl
          summary
          authors {
            id
            name
          }
        }
      }
    `
  }
}
</script>

<template>
  <ArticleList
    v-if="!!articles"
    v-bind="{
      articles,
      title: 'Hello World, Meet GraphQL'
    }"
  />
</template>
