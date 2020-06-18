<template>
  <div class="tool-menu">
    <div>
      <li
        :class="{ active: store.LS.editorSetting.openMenu }"
        @click="onMenuClicked"
      >
        <span class="material-icons">
          {{ store.LS.editorSetting.openMenu ? 'menu_open' : 'menu' }}
        </span>
      </li>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useActions } from '../store';

export default {
  name: 'ToolMenu',
  setup() {
    const store = useStore();
    const { editLocalStorage } = useActions(store);

    const onMenuClicked = () => {
      const setting = store.state.LS.editorSetting;
      editLocalStorage({
        key: 'openMenu',
        value: !setting.openMenu,
      });
    };

    return {
      store: store.state,
      onMenuClicked,
    };
  }
}
</script>

<style lang="scss">
.tool-menu {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 10;
  li {
    display: block;
    list-style: none;
    min-width: 50px;
    color: #fff;
    background: rgb(51, 114, 0);
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    transition: all 0.175s;
    > span {
      vertical-align: middle;
    }
    &:hover {
      background: rgb(70, 155, 0);
    }
    &.active {
      background: rgb(179, 6, 0);
      &:hover {
        background: rgb(200, 7, 0);
      }
    }
  }
}
</style>