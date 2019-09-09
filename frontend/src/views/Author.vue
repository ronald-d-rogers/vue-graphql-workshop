
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
        query getAuthor($id: Int!) {
          author(id: $id) {
            id
            name
            avatarUrl
            bio
            articles {
              id
              title
              imageUrl
              summary
              postedDate
              author {
                id
                name
              }
            }
          }
        }
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
