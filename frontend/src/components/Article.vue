<script>
import ArticleBody from './ArticleBody'
export default {
  components: {
    ArticleBody
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
      <p
        :class="$style.author"
        v-if="!!article.author.name"
      >
        By
        <router-link :to="{ name: 'author', params: { authorId: article.author.id } }">
          {{ article.author.name }}
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
