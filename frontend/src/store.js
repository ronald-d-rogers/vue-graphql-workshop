import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

const SET_ARTICLES = 'SET_ARTICLES'

export default new Vuex.Store({
  state: {
    articles: []
  },
  mutations: {
    [SET_ARTICLES]: (state, { articles }) => state.articles = articles
  },
  actions: {
    fetchArticles ({ commit }) {
      axios
        .get(`/articles`)
        .then(res => {
          const articles = res.data

          articles.forEach(article => {
            const authors = []
            // Could have used authors endpoint with a filter here
            article.authors.forEach(id => {
              axios
                .get(`/author/${id}`)
                .then(res => authors.push(res.data))
            })

            article.authors = authors
          })

          commit(SET_ARTICLES, { articles })
        })
    }
  }
})
