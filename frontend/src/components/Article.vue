<script>
import gql from 'graphql-tag'
import ArticleBody from './ArticleBody'
export default {
  components: {
    ArticleBody
  },
  props: {
    article: { type: Object, required: true }
  },
  fragments: {
    article: gql`
      fragment ArticleContent on Article {
        id
        title
        postedDate
        imageUrl
        body
        authors {
          id
          name
        }
      }
    `
  },
  computed: {
    authors() {
      return this.article.authors
    }
  }
}
</script>

<template>
  <article :class="$style.article">
    <header :class="$style.header">
      <h1 :class="$style.headline">
        {{ article.title }}
      </h1>
      <p
        :class="$style.author"
        v-if="!!authors.length"
      >
        By
        <router-link
          v-for="(author, index) in authors"
          :to="{ name: 'author', params: { authorId: author.id } }">
          {{ author.name }}<span v-if="index !== (authors.length - 1)">, </span>
        </router-link>
      </p>
      <p
        v-if="article.postedDate"
        :class="$style.date">
        {{ article.postedDate | apDate }}</p>
    </header>
    <img
      v-if="article.imageUrl"
      :src="article.imageUrl"
      :class="$style.imageLead">
    <ArticleBody
      v-if="!!article.body"
      v-bind="{ body: article.body }"/>
  </article>
</template>

<style module>
.article {
  margin: 0 16px 48px;
}
.header {
  margin-bottom: 24px;
}
.headline {
  composes: fontHeadingLg from "../assets/globals.css";
  margin: 0 0 20px;
  font-weight: bold;
  color: var(--color-secondary-accent);
}
.author {
  margin: 0 0 6px;
  color: var(--color-link);
}
.date {
  margin: 0 0 16px;
}
.imageLead {
  width: 100%;
  margin: 0 0 24px 0;
  border-radius: 25px;
}

@media (min-width: 768px) {
  .article {
    margin: 0 0 48px;
  }
}
</style>
