<template>
  <div id="normal-editor-view">
    <tool-menu>
      <transition name="jump-up">
        <normal-navbar
          :now="nowTab"
          v-show="store.LS.editorSetting.openMenu"
          @changeTab="nowTab = $event"
        />
      </transition>
    </tool-menu>

    <transition name="slide">
      <div class="editor-block" v-show="store.LS.editorSetting.openEditor">
        <html-editor v-show="nowTab === 'html'" :style="store.LS.editorSetting" />
        <css-editor v-show="nowTab === 'scss'" :style="store.LS.editorSetting" />
        <js-editor v-show="nowTab === 'js'" :style="store.LS.editorSetting" />
      </div>
    </transition>

    <normal-result />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import ToolMenu from '../components/ToolMenu.vue';
import NormalNavbar from '../components/Normal/Navbar.vue'
import HtmlEditor from '../components/Normal/HtmlEditor.vue'
import CssEditor from '../components/Normal/CssEditor.vue'
import JsEditor from '../components/Normal/JsEditor.vue'
import NormalResult from '../components/Normal/Result.vue'

export default {
  name: 'NormalEditorView',
  components: {
    ToolMenu,
    NormalNavbar,
    HtmlEditor,
    CssEditor,
    JsEditor,
    NormalResult,
  },
  setup() {
    const store = useStore();
    const nowTab = ref('html');

    return { store: store.state, nowTab };
  },
}
</script>

<style lang="scss" scoped>
#normal-editor-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  .editor-block {
    position: relative;
    width: 50%;
    animation-duration: 0.8s;
  }
  #normal-result {
    flex: auto;
  }
}
</style>