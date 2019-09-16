<template functional>
  <footer :class="$style.footer">
    <p>
      <router-link :to="{ name: 'home'}">
        Vue GraphQL Workshop
      </router-link> by
      <a href="https://github.com/ronald-d-rogers">Ronald Rogers</a>,
      <a href="https://github.com/bencodezen">Ben Hong</a> and help from
      <a href="https://github.com/TraceyHolinka/">Tracey Holinka</a>
    </p>
  </footer>
</template>

<style module>
.footer {
  composes: fontBase from "../assets/globals.css";
  margin: 48px auto 24px;
}
</style>
