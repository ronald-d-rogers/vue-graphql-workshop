<script>
// import gql from 'graphql-tag'
import AuthorBio from './AuthorBio'
import ArticleCard from './ArticleCard'

export default {
  components: {
    AuthorBio,
    ArticleCard
  },
  // fragments: {
  //   author: gql`
  //     fragment AuthorContent on Author {
  //       id
  //       name
  //       bio
  //       articles {
  //         ...ArticleCardContent
  //       }
  //     }
  //     ${ArticleCard.fragments.articleCard}
  //   `
  // },
  props: {
    author: { type: Object, required: true },
    showImageLead: { type: Boolean, required: false, default: true }
  }
}
</script>

<template>
  <section :class="$style.author">
    <AuthorBio
      v-bind="{ author }"
    />
    <ArticleCard
      v-for="article in author.articles"
      :key="article.id"
      :class="$style.card"
      v-bind="{
        article,
        showByline: true,
        showImageLead
      }"
    />
  </section>
</template>

<style module>
.author {
  margin: 0 16px;
}
.card {
  margin: 30px 0;
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
