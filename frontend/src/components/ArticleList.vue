<script>
import ListContainer from './ListContainer'
import ArticleCard from './ArticleCard'

export default {
  components: {
    ListContainer,
    ArticleCard
  },
  props: {
    articles: { type: Array, required: true },
    title: { type: String, required: false, default: null },
    showImageLead: { type: Boolean, required: false, default: true },
  }
}
</script>

<template>
<ListContainer>

  <template v-if="!!title" v-slot:heading>
    {{ title }}
  </template>
  <template v-slot>
    <ArticleCard
      v-for="article in articles"
      :key="article.id"
      v-bind="{ article, showImageLead }"
    />
  </template>
</ListContainer>
</template>
