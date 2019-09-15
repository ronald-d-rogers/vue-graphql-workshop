
<script>
import gql from 'graphql-tag'
import Author from '../components/Author'

export default {
  components: {
    Author
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
          id: this.$route.params.authorId
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
