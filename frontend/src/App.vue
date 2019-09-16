<script>
import menu from './data/menu.json'
import Modals from './views/Modals.vue'
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  inject: ['modals'],
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    Modals
  },
  data() {
    return {
      menu: menu
    }
  }
}
</script>

<template>
  <div
    id="app"
    :class="$style.app">
    <TheHeader :menu="menu"/>
    <router-view/>
    <TheFooter/>
    <Modals />
  </div>
</template>

<style module>
@import url(assets/globals.css);
.app {
  max-width: 640px;
  margin: 24px auto 0;
}
</style>
