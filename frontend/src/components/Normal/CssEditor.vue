<template>
  <div id="normal-scss-editor" class="editor"></div>
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
  name: 'CssEditor',
  setup() {
    const store = useStore();
    const { editNormalContent, updateEditor } = useActions(store);
    const content = localStorage['normal-scss-editor'] || '';
    const withTimer = setTimer(1500);

    createEditor('normal-scss-editor', {
      mode: 'ace/mode/scss',
      theme: 'ace/theme/terminal',
    }, editor => {
      // insert editor
      updateEditor({
        key: 'scss',
        value: editor,
      });

      // init content
      editor.setValue(content);
      editor.session.setTabSize(getEditorSetting().tabSize);
      editNormalContent({
        key: 'scss',
        value: editor.getValue(),
      });

      // listen change
      editor.on('change', function(e) {
        editNormalContent({
          key: 'scss',
          value: editor.getValue(),
        });
        withTimer(() => {
          setIframe(
            store,
            document.getElementById('normal-result'),
          );
          localStorage['normal-scss-editor'] = editor.getValue();
        });
      });

      // observe drag
      widthObserver(editor);
    });

    return {};
  },
}
</script>
