<script>
import gql from 'graphql-tag'
import Authors from '../components/Authors.vue'

export default {
  components: {
    Authors
  },
  apollo: {
    authors: gql`
      query getAuthors {
        authors {
          id
          name
          bio
          articles {
            id
            title
            postedDate
          }
        }
      }
    `
  }
}
</script>

<template>
  <Authors
    v-if="!!authors"
    v-bind="{ authors }"/>
</template>
