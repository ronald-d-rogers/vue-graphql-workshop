<template>
  <div
    id="app"
    :class="$style.app">
    <slot/>
  </div>
</template>

<style module>
@import url(../assets/globals.css);
.app {
  max-width: 640px;
  margin: 24px auto 0;
}
</style>
