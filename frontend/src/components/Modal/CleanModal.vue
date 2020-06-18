<template>
  <modal class="clean-modal" :openState="store.modal === 'cleanModal'">
    <div class="content">
      <div class="text">
        <span>是否確認清除所有當前內容？</span>
      </div>
      <button class="btn btn-success mr-2" @click="onConfirm">確定</button>
      <button class="btn btn-secondary" @click="onCancel">取消</button>
    </div>
  </modal>
</template>

<script>
import { useStore } from 'vuex';
import { useActions } from '../../store';
import Modal from './Modal.vue';

export default {
  name: 'CleanModal',
  components: {
    Modal,
  },
  setup() {
    const store = useStore();
    const { updateModal } = useActions(store);

    const onCancel = () => {
      updateModal('');
    };

    const onConfirm = () => {
      localStorage['js-editor'] = '';
      localStorage['normal-html-editor'] = '';
      localStorage['normal-scss-editor'] = '';
      localStorage['normal-js-editor'] = '';
      location.href = '';
    };
  

    return {
      store: store.state,
      onCancel,
      onConfirm,
    };
  }
}
</script>

<style lang="scss">
.clean-modal {
  .content {
    padding: 10px 20px;
    text-align: center;
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100px;
    }
  }
}
</style>
