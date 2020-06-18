<template>
  <div id="normal-editor-view">
    <normal-navbar :now="nowTab" @changeTab="nowTab = $event" />

    <transition name="slide">
      <div class="editor-block" v-show="store.editorSetting.openEditor">
        <html-editor v-show="nowTab === 'html'" :style="store.editorSetting" />
        <css-editor v-show="nowTab === 'scss'" :style="store.editorSetting" />
        <js-editor v-show="nowTab === 'js'" :style="store.editorSetting" />
      </div>
    </transition>

    <normal-result />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import NormalNavbar from '../components/Normal/Navbar.vue'
import HtmlEditor from '../components/Normal/HtmlEditor.vue'
import CssEditor from '../components/Normal/CssEditor.vue'
import JsEditor from '../components/Normal/JsEditor.vue'
import NormalResult from '../components/Normal/Result.vue'

export default {
  name: 'NormalEditorView',
  components: {
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