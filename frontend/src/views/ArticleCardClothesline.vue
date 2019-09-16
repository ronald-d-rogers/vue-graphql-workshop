<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      articleId: { type: Number, required: true }
    },
    computed: {
      ...mapState(['articles']),
      index() {
        for (let i = 0; i < this.articles.length; i++) {
          if (this.articles[i].id === this.articleId) {
            return i
          }
        }

        return null
      },
      previous() {
        return this.index >= 0
          ? this.articles[this.index - 1]
          : null
      },
      next() {
        return this.index < this.articles.length - 1
          ? this.articles[this.index + 1]
          : null
      }
    }
  }
</script>

<template>
  <nav
    v-if="!!articles.length"
    :class="$style.nav"
  >
    <div
      v-if="!!previous"
    >
      <router-link :to="{ name: 'article', params: { id: previous.id } }">
        <span v-html="`< ${previous.title}`"></span>
      </router-link>
    </div>
    <div
      v-if="!!next"
    >
      <router-link :to="{ name: 'article', params: { id: next.id } }">
        <span v-html="`${next.title} >`"></span>
      </router-link>
    </div>
  </nav>
</template>

<style module>
.nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
