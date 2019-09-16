<script>
// import gql from 'graphql-tag'
// import ArticleByline from '../components/ArticleByline.vue'
import axios from 'axios'
import clickOutside from '../directives/click-outside'

export default {
  // components: {
  //   ArticleByline
  // },
  inject: ['modals'],
  directives: {
    clickOutside,
  },
  data() {
    return {
      name: ''
    }
  },
  props: {
    id: { type: Number, required: true }
  },
  methods: {
    save() {
      axios
        .put(`/author/${this.id}`, { name: this.name })
        .then(() => this.modals.close())
    },
    // save() {
    //   return this.$apollo.mutate({
    //     mutation: gql`
    //     mutation updateAuthor($id: ID!, $name: String!) {
    //       updateAuthor(id: $id, name: $name) {
    //         author {
    //           id
    //           articles {
    //             ...ArticleBylineContent
    //           }
    //         }
    //       }
    //     }
    //     ${ArticleByline.fragments.articleByline}
    //   `,
    //     variables: { id: this.id, id: this.id }
    //   })
    // }
    close() {
      this.modals.close()
    }
  }
}
</script>

<template>
<transition name="modal">
  <div
    v-click-outside="close"
    :class="$style.modal"
  >
    <h3
      :class="$style.title"
    >Edit Author Name</h3>
    <label
      :class="$style.label"
      for="name">
      Name
    </label>
    <input
      v-model="name"
      :class="$style.input"
      type="text"
      id="name"
      name="name"
    />
    <div
      :class="$style.buttons"
    >
      <button @click="close">Cancel</button>
      <button @click="save">Save</button>
    </div>
  </div>
</transition>
</template>

<style module>
.modal {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 160px;
  max-width: 550px;
  padding: 10px;
  border-radius: 2px;
  background-color: var(--police-blue);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
}
.title {
  margin: 0 0 20px;
}
.label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}
.input {
  display: block;
  width: 100%;
  height: 25px;
  margin-bottom: 6px;
}
.buttons {
  margin-top: 20px;
}
</style>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
