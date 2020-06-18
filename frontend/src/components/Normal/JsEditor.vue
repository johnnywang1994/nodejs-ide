<template>
  <div id="normal-js-editor" class="editor"></div>
</template>

<script>
import { useStore } from 'vuex';
import { useActions } from '../../store';
import {
  createEditor,
  setTimer,
  setIframe,
  widthObserver,
  getEditorSetting,
} from '../../plugin/utils';

export default {
  name: 'JsEditor',
  setup() {
    const store = useStore();
    const { editNormalContent, updateEditor } = useActions(store);
    const content = localStorage['normal-js-editor'] || '';
    const withTimer = setTimer(1500);

    createEditor('normal-js-editor', {
      mode: 'ace/mode/javascript',
      theme: 'ace/theme/monokai',
    }, editor => {
      // insert editor
      updateEditor({
        key: 'js',
        value: editor,
      });

      // init content
      editor.setValue(content);
      editor.session.setTabSize(getEditorSetting().tabSize);
      editNormalContent({
        key: 'js',
        value: editor.getValue(),
      });

      // listen change
      editor.on('change', function(e) {
        editNormalContent({
          key: 'js',
          value: editor.getValue(),
        });
        withTimer(() => {
          setIframe(
            store,
            document.getElementById('normal-result'),
          );
          localStorage['normal-js-editor'] = editor.getValue();
        });
      });

      // observe drag
      widthObserver(editor);
    });

    return {};
  },
}
</script>
