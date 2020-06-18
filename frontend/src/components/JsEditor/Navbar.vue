<template>
  <div class="js-navbar">
    <!-- Toggle -->
    <li
      :class="{ active: store.LS.editorSetting.openEditor }"
      @click="onToggleEditor"
    >
      <span class="material-icons" v-if="store.LS.editorSetting.openEditor">
        toggle_off
      </span>
      <span class="material-icons" v-else>toggle_on</span>
    </li>

    <!-- Fullscreen -->
    <li :class="{ active: fullscreenRef }" @click="onClickFullscreen">
      <span class="material-icons" v-if="fullscreenRef">
        close_fullscreen
      </span>
      <span class="material-icons" v-else>open_in_full</span>
    </li>

    <!-- Font-size -->
    <li @click="onChangeFontSize(1)">
      <span class="material-icons">add</span>
    </li>
    <li @click="onChangeFontSize(-1)">
      <span class="material-icons">remove</span>
    </li>

    <!-- Tab-size -->
    <li @click="onChangeTabSize">
      <span class="material-icons">sync_alt</span>
      {{ store.LS.editorSetting.tabSize }}
    </li>

    <!-- Download -->
    <li @click="onDownload">
      <span class="material-icons">get_app</span>
    </li>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useActions } from '../../store';
import { download } from '../../plugin/utils';


export default {
  name: 'JsNavbar',
  setup() {
    const store = useStore();
    const { editLocalStorage } = useActions(store);
    const fullscreenRef = ref(false);

    const onToggleEditor = () => {
      const setting = store.state.LS.editorSetting;
      editLocalStorage({
        key: 'openEditor',
        value: !setting.openEditor,
      })
    }

    const onClickFullscreen = () => {
      const doc = document.documentElement || document.body;

      if (document.fullscreenElement) {
        fullscreenRef.value = false;
        document.exitFullscreen();
      } else {
        fullscreenRef.value = true;
        doc.requestFullscreen();
      }
    };

    const onChangeFontSize = (size) => {
      const setting = store.state.LS.editorSetting;
      editLocalStorage({
        key: 'fontSize',
        value: parseFloat(setting.fontSize) + size + 'px',
      });
    };

    const onDownload = () => {
      download('editor.js', store.state.jsEditContent);
    };

    const onChangeTabSize = () => {
      const { editors } = store.state;
      const { editorSetting } = store.state.LS;
      const nowTabSize = editorSetting.tabSize;
      const targetTabSize = nowTabSize === 4 ? 2 : 4;
      editLocalStorage({
        key: 'tabSize',
        value: targetTabSize,
      });

      Object.keys(editors).forEach(key => {
        if (editors[key]) {
          editors[key].session.setTabSize(targetTabSize);
        }
      });
    };

    return {
      store: store.state,
      fullscreenRef,
      onToggleEditor,
      onClickFullscreen,
      onChangeFontSize,
      onDownload,
      onChangeTabSize,
    };
  },
}
</script>

<style lang="scss" scoped>
.js-navbar {
  position: absolute;
  bottom: 0;
  left: 100%;
  width: 30%;
  min-width: 300px;
  display: flex;
  animation-duration: 0.3s;
  li {
    display: block;
    list-style: none;
    min-width: 50px;
    color: #fff;
    background: rgb(37, 37, 37);
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    transition: all 0.175s;
    &:hover {
      background: rgb(134, 65, 0);
    }
    &.active {
      font-weight: 700;
      border-color: #fff;
      background: rgb(93, 93, 93);
    }
    > span {
      vertical-align: middle;
    }
  }
}
</style>
