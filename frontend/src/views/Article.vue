<script>
import axios from 'axios'
import Article from '../components/Article.vue'

export default {
  components: {
    Article
  },
  data () {
    return {
      article: null
    }
  },
  mounted() {
    axios
      .get(`/article/${this.$route.params.id}`)
      .then(res => {
        const article = res.data

        const authors = []
        article.authors.forEach(id => {
          axios
            .get(`/author/${id}`)
            .then(res => authors.push(res.data))
          })

        article.authors = authors
        this.article = article
      })
  }
}
</script>

<template>
  <Article
    v-if="!!article"
    v-bind="{ article }"
  />
</template>
