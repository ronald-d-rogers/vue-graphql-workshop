<script>
import gql from 'graphql-tag'
import Author from '../components/Author'

export default {
  inject: ['modals'],
  components: {
    Author
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  apollo: {
    author: {
      query: gql`
        query getAuthor($id: ID!) {
          author(id: $id) {
            ...AuthorContent
          }
        }
        ${Author.fragments.author}
      `,
      variables() {
        return {
          id: this.id
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <Author
      v-if="!!author"
      v-bind="{ author }"
    />
  </div>
</template>
