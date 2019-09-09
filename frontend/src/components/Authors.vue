<script>
import ListContainer from './ListContainer'
import Author from './Author'

export default {
  components: {
    ListContainer,
    Author
  },
  props: {
    authors: { type: Array, required: true }
  }
}
</script>

<template>
<ListContainer>
  <template v-slot>
    <Author
      v-for="author in authors"
      :key="author.id"
      :class="$style.item"
      v-bind="{ author, showImageLead: false }"
    />
  </template>
</ListContainer>
</template>

<style module>
.item {
  margin: 0 0 36px;
}
</style>
