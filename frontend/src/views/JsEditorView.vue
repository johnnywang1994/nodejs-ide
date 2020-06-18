<template>
  <div id="js-editor-view">
    <tool-menu>
      <transition name="jump-up">
        <js-navbar v-show="store.LS.editorSetting.openMenu" />
      </transition>
    </tool-menu>
    
    <js-editor :style="store.LS.editorSetting" />
    <result />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import ToolMenu from '../components/ToolMenu.vue';
import JsNavbar from '../components/JsEditor/Navbar.vue';
import JsEditor from '../components/JsEditor/Editor.vue'
import Result from '../components/JsEditor/Result.vue'

export default {
  name: 'JsEditorView',
  components: {
    ToolMenu,
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