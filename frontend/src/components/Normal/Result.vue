<template>
  <iframe
    id="normal-result"
    ref="normalResultRef"
    frameborder="0"
  ></iframe>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { setIframe } from '../../plugin/utils';

export default {
  setup() {
    const store = useStore();
    const normalResultRef = ref(null);

    onMounted(() => {
      setIframe(store, normalResultRef.value)
    });

    return { store: store.state, normalResultRef };
  },
}
</script>
