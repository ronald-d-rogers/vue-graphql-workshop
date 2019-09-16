<script>
import Avatar from './Avatar'

export default {
  inject: ['modals'],
  components: {
    Avatar
  },
  props: {
    author: { type: Object, required: true },
    showAvatar: { type: Boolean, required: false, default: true }
  }
}
</script>

<template>
  <section :class="$style.authorBio">
    <h1 :class="$style.name">
      {{ author.name }}
      <button
        :class="$style.editName"
        @click="modals.open('edit-author-name', { id: author.id })"
      >
        Edit
      </button>
    </h1>
    <div :class="$style.avatar">
      <Avatar v-if="!!showAvatar"/>
    </div>
    <p :class="$style.bio">
      {{ author.bio }}
    </p>
  </section>
</template>

<style module>
.authorBio {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.name {
  composes: fontHeadingLg from "../assets/globals.css";
  margin: 0 0 24px;
}
.editName {
  float: right;
}
.avatar {
  margin-bottom: 16px;
}
.bio {
  composes: fontBase from "../assets/globals.css";
  margin: 0 0 24px;
}
</style>
