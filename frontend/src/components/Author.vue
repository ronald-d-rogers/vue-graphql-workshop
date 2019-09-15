<script>
import gql from 'graphql-tag'
import AuthorBio from './AuthorBio'
import ArticleCard from './ArticleCard'

export default {
  components: {
    AuthorBio,
    ArticleCard
  },
  props: {
    author: { type: Object, required: true },
    showImageLead: { type: Boolean, required: false, default: true }
  },
  fragments: {
    author: gql`
      fragment AuthorContent on Author {
        id
        name
        bio
        articles {
          ...ArticleCardContent
        }
      }
      ${ArticleCard.fragments.articleCard}
    `
  }
}
</script>

<template>
  <section :class="$style.author">
    <AuthorBio v-bind="{ author }"/>
    <ArticleCard
      v-for="article in author.articles"
      :key="article.id"
      :class="$style.card"
      v-bind="{ article, showAuthor: false, showImageLead }"
    />
    <template>
</template>

  </section>
</template>

<style module>
.author {
  margin: 0 16px;
}
.card {
  margin: 16px 0;
}

/* Here h2 isn't locally scopped. */
/* .author h2 {
  background: purple;
} */

@media (min-width: 768px) {
  .author {
    margin: 0;
  }
}
</style>
