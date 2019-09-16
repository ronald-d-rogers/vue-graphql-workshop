<script>
import axios from 'axios'
import Article from '../components/Article.vue'
import ArticleCardClothesline from './ArticleCardClothesline.vue'

export default {
  components: {
    ArticleCardClothesline,
    Article
  },
  data () {
    return {
      article: null
    }
  },
  mounted() {
    this.fetchArticle()
  },
  watch: {
    id() {
      this.fetchArticle()
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  methods: {
    fetchArticle() {
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
}
</script>

<template>
  <div>
    <ArticleCardClothesline
      v-if="!!article"
      v-bind="{ articleId: article.id }"
    />
    <Article
      v-if="!!article"
      v-bind="{ article }"
    />
  </div>
</template>
