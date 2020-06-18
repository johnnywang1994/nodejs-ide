<template>
  <router-view />
  <clean-modal />
</template>

<script>
import CleanModal from './components/Modal/CleanModal.vue';

export default {
  name: 'App',
  components: {
    CleanModal,
  },
}
</script>

<style lang="scss" scoped>
#app {
}
</style>