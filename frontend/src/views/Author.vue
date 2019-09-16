<script>
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
  mounted() {
    this.fetchAuthor()
  },
  watch: {
    id() {
      this.fetchAuthor()
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
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
