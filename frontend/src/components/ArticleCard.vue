<script>
export default {
  props: {
    article: { type: Object, required: true },
    showImageLead: { type: Boolean, required: false, default: true },
    showAuthor: { type: Boolean, required: false, default: true }
  }
}
</script>

<template>
  <article :class="$style.articleCard">
    <h2
      v-if="!!article.title"
      :class="$style.headline">
      <router-link :to="{ name: 'article', params: { articleId: article.id } }">
        {{ article.title }}
      </router-link>
    </h2>
    <img
      v-if="showImageLead && !!article.imageUrl"
      :src="article.imageUrl"
      :class="$style.imageLead">
    <p
      v-if="showAuthor && !!article.author && !!article.author.name"
      :class="$style.author"
    >
      By <router-link :to="{ name: 'author', params: { authorId: article.author.id } }">
        {{ article.author.name }}
      </router-link>
    </p>
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
.author {
  margin: 0 0 16px;
}
.headline {
  margin: 0 0 20px;
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
