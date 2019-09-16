<script>
// import gql from 'graphql-tag'
import axios from 'axios'
import Author from '../components/Author'

export default {
  inject: ['modals'],
  components: {
    Author
  },
  data() {
    return {
      author: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.fetchAuthor()
  },
  methods: {
    fetchAuthor() {
      axios
        .get(`/author/${this.id}`)
        .then(res => {
          const author = res.data

          const articles = []
          author.articles.forEach(id => {
            axios
              .get(`/article/${id}`)
              .then(res => {
                const article = res.data

                const authors = []
                article.authors.forEach(id => {
                  axios
                    .get(`/author/${id}`)
                    .then(res => authors.push(res.data))
                })

                article.authors = authors
                articles.push(article)
              })
          })

          author.articles = articles
          this.author = author
        })
    },
  }
  // apollo: {
  //   author: {
  //     query: gql`
  //       query getAuthor($id: ID!) {
  //         author(id: $id) {
  //           ...AuthorContent
  //         }
  //       }
  //       ${Author.fragments.author}
  //     `,
  //     variables() {
  //       return {
  //         id: this.$route.params.id
  //       }
  //     }
  //   }
  // }
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
