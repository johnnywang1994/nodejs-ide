<template>
  <div id="js-editor-view">
    <js-navbar />  
    <js-editor :style="store.editorSetting" />
    <result />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import JsNavbar from '../components/JsEditor/Navbar.vue';
import JsEditor from '../components/JsEditor/Editor.vue'
import Result from '../components/JsEditor/Result.vue'

export default {
  name: 'JsEditorView',
  components: {
    JsNavbar,
    JsEditor,
    Result,
  },
  setup() {
    const store = useStore();

    return { store: store.state };
  },
}
</script>

<style lang="scss" scoped>
#js-editor-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  #js-editor {
    width: 50%;
  }
  #js-result {
    flex: auto;
  }
}
</style>