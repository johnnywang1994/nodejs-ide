<template>
  <div class="normal-navbar">
    <!-- Toggle -->
    <li
      :class="{ active: store.editorSetting.openEditor }"
      @click="onToggleEditor"
    >
      <span class="material-icons" v-if="store.editorSetting.openEditor">
        toggle_off
      </span>
      <span class="material-icons" v-else>toggle_on</span>
    </li>

    <!-- Tabs -->
    <li
      v-for="tab in navList"
      :key="`nav_${tab}`"
      :class="['tab', { active: tab === props.now }]"
      @click="$emit('changeTab', tab)"
    >
      {{ tab }}
    </li>

    <!-- Fullscreen -->
    <li :class="{ active: fullscreenRef }" @click="onClickFullscreen">
      <span class="material-icons">open_in_full</span>
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
      {{ store.editorSetting.tabSize }}
    </li>

    <!-- Download -->
    <li @click="onDownload">
      <span class="material-icons">get_app</span>
    </li>

    <!-- Clean -->
    <li @click="onClean">
      <span class="material-icons">cleaning_services</span>
    </li>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useActions } from '../../store';
import { download } from '../../plugin/utils';

const navList = [
  'html',
  'scss',
  'js',
];

export default {
  name: 'NormalNavbar',
  props: {
    now: {
      type: String,
      default: 'html',
    },
  },
  setup(props) {
    const store = useStore();
    const { updateEditorSetting, updateModal } = useActions(store);
    const fullscreenRef = ref(false);

    const onToggleEditor = () => {
      const setting = store.state.editorSetting;
      updateEditorSetting({
        ...setting,
        openEditor: !setting.openEditor,
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
      const setting = store.state.editorSetting;
      updateEditorSetting({
        ...setting,
        fontSize: parseFloat(setting.fontSize) + size + 'px',
      });
    };

    const onDownload = () => {
      download(`editor.${props.now}`, store.state.normalEditContent[props.now]);
    };

    const onChangeTabSize = () => {
      const { editors, editorSetting } = store.state;
      const nowTabSize = editorSetting.tabSize;
      const targetTabSize = nowTabSize === 4 ? 2 : 4;
      updateEditorSetting({
        ...editorSetting,
        tabSize: targetTabSize,
      });
      Object.keys(editors).forEach(key => {
        editors[key].session.setTabSize(targetTabSize);
      });
    };

    const onClean = () => {
      updateModal('cleanModal');
    };

    return {
      navList,
      store: store.state,
      props,
      fullscreenRef,
      onToggleEditor,
      onClickFullscreen,
      onChangeFontSize,
      onDownload,
      onChangeTabSize,
      onClean,
    };
  },
}
</script>

<style lang="scss" scoped>
.normal-navbar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30%;
  min-width: 300px;
  display: flex;
  z-index: 10;
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
    &.tab {
      flex: auto;
      &.active {
        font-weight: 700;
        border-color: #fff;
        background: rgb(93, 93, 93);
      }
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
