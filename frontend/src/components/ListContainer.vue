<template>
  <div :class="$style.list">
    <header v-if="this.$slots.heading">
      <h1 :class="$style.heading">
        <slot name="heading"/>
      </h1>
    </header>
    <section>
      <slot/>
    </section>
  </div>
</template>

<style module>
.list {
  padding: 0 16px;
}
.heading {
  composes: fontHeadingLg from "../assets/globals.css";
  margin: 0 0 24px;
  text-align: center;
  color: var(--color-secondary-accent);
}

@media (min-width: 768px) {
  .list {
    padding: 0;
  }
}
</style>
