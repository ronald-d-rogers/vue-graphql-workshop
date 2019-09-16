import Vue from 'vue'

export default Vue.observable({
  id: '',
  options: {},
  open(id = '', options = {}) {
    this.id = id
    this.options = options
  },
  close() {
    this.id = ''
    this.options = {}
  }
})
