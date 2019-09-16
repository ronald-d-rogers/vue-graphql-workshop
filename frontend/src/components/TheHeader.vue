<script>
import TheMenu from './TheMenu'
import MenuIcon from './IconMenu'

export default {
  components: {
    TheMenu,
    MenuIcon
  },
  props: {
    menu: { type: Array, required: true }
  },
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    close() {
      this.showMenu = false
    },
    open() {
      this.showMenu = true
    }
  }
}
</script>

<template>
  <header
    :class="$style.header"
  >
    <button
      aria-haspopup="true"
      aria-owns="hamburger-menu"
      type="button"
      :class="$style.button"
      @click.stop="open"
    >
      <MenuIcon/>
    </button>
    <h1
      :class="$style.title"
    >
      <router-link
        :class="$style.link"
        :to="{ name: 'home'}">
        Vue GraphQL Workshop
      </router-link>
    </h1>
    <TheMenu
      v-show="showMenu"
      id="hamburger-menu"
      :aria-hidden="!showMenu"
      :menu="menu"
      @close="close"
    />
  </header>
</template>

<style module>
.header {
  display: flex;
  margin: 0 0 24px;
}
.title {
  margin: 6px 0 0 0;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: -0.64px;
  color: var(--color-primary);
  font-weight: bold;
  text-align: center;
  text-decoration: none;
}
.link {
  margin: 6px 0 0 0;
  color: var(--color-primary);
}
.button {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  margin: 0 24px 0 0;
  padding: 0;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;
}
</style>
