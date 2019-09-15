<script>
import { directive as onClickaway } from 'vue-clickaway';
import CloseIcon from './IconClose'

export default {
  directives: {
    onClickaway: onClickaway,
  },
  components: {
    CloseIcon
  },
  props: {
    menu: { type: Array, required: true },
    close: { type: Function, required: true }
  }
}
</script>

<template>
  <div
    v-on-clickaway="close"
    :class="$style.menu"
  >
    <div
      :class="$style.closeIcon"
      @click="close"
    >
      <CloseIcon/>
    </div>
    <nav :class="$style.nav">
      <ul
        v-if="!!menu"
        :class="$style.list"
      >
        <li
          v-for="item in menu"
          :key="item.id"
          :class="$style.item"
        >
        <router-link
          class="menu-link"
          :to="{ name: item.name }"
          @click.native="close"
        >
          {{ item.label }}
        </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style module>
.menu {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 360px;
  height: 100%;
  padding: 24px 12px;
  background: var(--color-medium);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}
.closeIcon {
  position: absolute;
  z-index: 1;
  right: 30px;
  width: 24px;
  height: 24px;
  fill: var(--color-primary-accent);
  cursor: pointer;
}
.nav {
  composes: fontHeadingSm from "../assets/globals.css";
  color: var(--color-dark);
  font-weight: bold;
}
.list {
  margin: 0;
  padding: 0;
}
.item {
  margin: 0 0 12px;
  padding: 6px 0;
}
</style>

<style>
/* Vue writes the router classes so CSS Modules can't be used.
There are 2 options: create a second style block or create a child
component. If there are more than a few style it's probably better
to have a separte component. */

.menu-link.router-link-exact-active {
  color: var(--rose-ebony)
}
</style>
