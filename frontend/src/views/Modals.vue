<script>
import EditAuthorNameModal from './ModalsEditAuthorName.vue'
export default {
  inject: ['modals'],
  components: {
    EditAuthorNameModal
  }
}
</script>

<template>
  <div>
    <EditAuthorNameModal
      v-if="modals.id === 'edit-author-name'"
      v-bind="{ ...modals.options }"
    />
  </div>
</template>
