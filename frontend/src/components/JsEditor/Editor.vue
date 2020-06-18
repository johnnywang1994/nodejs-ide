<template>
  <transition name="slide">
    <div
      id="js-editor"
      class="editor"
      v-show="store.editorSetting.openEditor"
    ></div>
  </transition>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useActions } from '../../store';
import consoleHook from '../../plugin/logHook';
import { createEditor, setTimer } from '../../plugin/utils';

export default {
  name: 'JsEditor',
  setup() {
    const store = useStore();
    const { pushLogs, updateEditor, editJsContent } = useActions(store);
    const content = localStorage['js-editor'] || '';
    const withTimer = setTimer(1500);

    consoleHook((key, ...value) => {
      pushLogs({
        key,
        value,
      });
    });

    createEditor('js-editor', {
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/monokai',
    }, editor => {
      // insert editor
      updateEditor({
        key: 'jsSingle',
        value: editor,
      });

      // init value
      editor.setValue(content);
      editJsContent(content);

      // listen change
      editor.on('change', function(e) {
        editJsContent(editor.getValue());
        withTimer(() => {
          new Function('', `${store.state.jsEditContent};`)();
          localStorage['js-editor'] = editor.getValue();
        });
      });
    });

    return { store: store.state };
  },
}
</script>

<style lang="scss">
#js-editor {
  animation-duration: 0.8s;
}
</style>