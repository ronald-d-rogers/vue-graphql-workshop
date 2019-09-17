<script>
import gql from 'graphql-tag'
import Article from '../components/Article.vue'
import ArticleCardClothesline from './ArticleCardClothesline.vue'

export default {
  components: {
    ArticleCardClothesline,
    Article
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
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <ArticleCardClothesline
      v-if="!!article"
      v-bind="{ articleId: article.id }"
    />
    <Article
      v-if="!!article"
      v-bind="{ article }"
    />
  </div>
</template>
