<script>
import gql from 'graphql-tag'
import ArticleByline from './ArticleByline'

export default {
  components: {
    ArticleByline
  },
  fragments: {
    articleCard: gql`
      fragment ArticleCardContent on Article {
        id
        title
        summary
        authors {
          ...BylineAuthorContent
        }
      }
      ${ArticleByline.fragments.bylineAuthor}
    `
  },
  props: {
    article: { type: Object, required: true },
    showImageLead: { type: Boolean, required: false, default: true },
    showByline: { type: Boolean, required: false, default: true }
  }
}
</script>

<template>
  <article :class="$style.articleCard">
    <h2
      v-if="!!article.title"
      :class="$style.headline">
      <router-link :to="{ name: 'article', params: { id: article.id } }">
        {{ article.title }}
      </router-link>
    </h2>
    <!--<img-->
    <!--v-if="showImageLead && !!article.imageUrl"-->
    <!--:src="article.imageUrl"-->
    <!--:class="$style.imageLead"-->
    <!--&gt;-->
    <ArticleByline
      v-if="showByline && !!article.authors.length"
      v-bind="{ authors: article.authors }"
      :class="$style.byline"
    />
    <p
      v-if="!!article.summary"
      :class="$style.summary">
      {{ article.summary }}
    </p>
  </article>
</template>

<style module>
.articleCard {
  margin: 48px 0;
}
.byline {
  margin: 0 0 16px;
}
.headline {
  margin: 0 0 12px;
  composes: fontHeadingSm from "../assets/globals.css";
  font-weight: bold;
}
.imageLead {
  object-fit: cover;
  object-position: right top;
  width: 100%;
  max-height: 360px;
  height: 100%;
  margin-bottom: 24px;
  border-radius: 25px;
}
.summary {
  composes: fontBase from "../assets/globals.css";
  margin: 0 0 16px;
}
</style>
