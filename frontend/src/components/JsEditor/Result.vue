<template>
  <div id="js-result">
    <li v-for="log in store.logs" :class="log.key" :key="log.value">
      {{ Array.isArray(log.value) ? log.value.join(', ') : log.value }}
    </li>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      store: store.state
    };
  },
}
</script>

<style lang="scss">
#js-result {
  li {
    list-style: none;
    padding: 5px 10px;
    border-bottom: 1px solid rgb(219, 219, 219);
    &.warn {
      color: rgb(128, 83, 0);
      background:rgb(255, 211, 129);
    }
    &.error {
      color: rgb(149, 0, 0);
      background: rgb(255, 175, 175);
    }
  }
}
</style>