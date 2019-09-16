<script>
// import gql from 'graphql-tag'
import { mapActions, mapState } from 'vuex'
import ArticleList from '../components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  computed: {
    ...mapState(['articles'])
  },
  methods: {
    ...mapActions(['fetchArticles'])
  },
  created() {
    this.fetchArticles()
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
    v-bind="{
      articles,
      title: 'Hello World, Meet GraphQL'
    }"
  />
</template>
