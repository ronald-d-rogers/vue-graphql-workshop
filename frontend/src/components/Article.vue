<script>
import gql from 'graphql-tag'
import ArticleBody from './ArticleBody'
import ArticleByline from './ArticleByline'

export default {
  components: {
    ArticleByline,
    ArticleBody
  },
  fragments: {
    article: gql`
      fragment ArticleContent on Article {
        id
        title
        postedDate
        body
        authors {
          ...BylineAuthorContent
        }
      }
      ${ArticleByline.fragments.bylineAuthor}
    `
  },
  props: {
    article: { type: Object, required: true }
  }
}
</script>

<template>
  <article :class="$style.article">
    <header :class="$style.header">
      <h1 :class="$style.headline">
        {{ article.title }}
      </h1>
      <ArticleByline
        v-if="!!article.authors.length"
        v-bind="{ authors: article.authors }"
        :class="$style.byline"
      />
      <p
        v-if="article.postedDate"
        :class="$style.date">
        {{ article.postedDate | apDate }}
      </p>
    </header>
    <ArticleBody
      v-if="!!article.body"
      v-bind="{ body: article.body }"
    />
  </article>
</template>

<style module>
.article {
  margin: 0 16px 48px;
}
.byline {
  margin: 0 0 6px;
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
