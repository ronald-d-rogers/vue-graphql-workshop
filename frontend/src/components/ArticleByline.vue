<script>
  // import gql from 'graphql-tag'

  export default {
    // fragments: {
    //   bylineAuthor: gql`
    //     fragment BylineAuthorContent on Author {
    //       id
    //       name
    //     }
    //   `
    // },
    props: {
      authors: { type: Array, required: true }
    },
    computed: {
      last() {
        return this.authors.length - 1
      }
    }
  }
</script>

<template>
  <p
    :class="$style.byline"
    v-if="!!authors.length"
  >
    By
    <router-link
      v-for="(author, index) in authors"
      :key="index"
      :to="{ name: 'author', params: { id: author.id } }">
      {{ author.name }}<span v-if="index !== last">, </span>
    </router-link>
  </p>
</template>

<style module>
  .byline {
    color: var(--color-link);
  }
</style>
