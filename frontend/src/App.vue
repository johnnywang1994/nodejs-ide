<template>
  <router-view />
  <clean-modal />
</template>

<script>
import { useStore } from 'vuex';
import { useActions } from './store';
import CleanModal from './components/Modal/CleanModal.vue';

export default {
  name: 'App',
  components: {
    CleanModal,
  },
  setup() {
    const store = useStore();
    const { initLocalStorage } = useActions(store);
    initLocalStorage();

    return {};
  },
}
</script>

<style lang="scss" scoped>
#app {}
</style>