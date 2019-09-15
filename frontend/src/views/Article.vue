<script>
import gql from 'graphql-tag'
import Article from '../components/Article.vue'

export default {
  components: {
    Article
  },
  data () {
    return {
      article: null
    }
  },
  apollo: {
    article: {
      query: gql`
        query getArticle($id: ID!) {
          article(id: $id) {
            ...ArticleContent
          }
        }
        ${Article.fragments.article}
      `,
      variables() {
        return {
          id: this.$route.params.articleId
        }
      }
    }
  }
}
</script>

<template>
  <Article
    v-if="!!article"
    v-bind="{ article }"/>
</template>
