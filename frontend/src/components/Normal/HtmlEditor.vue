<template>
  <div id="normal-html-editor" class="editor"></div>
</template>

<script>
import { useStore } from 'vuex';
import { useActions } from '../../store';
import {
  createEditor,
  setTimer,
  createIframe,
  widthObserver,
} from '../../plugin/utils';

export default {
  name: 'HtmlEditor',
  setup() {
    const store = useStore();
    const { editNormalContent, updateEditor } = useActions(store);
    const content = localStorage['normal-html-editor'] || '';
    const withTimer = setTimer(1500);

    createEditor('normal-html-editor', {
      mode: 'ace/mode/html',
      theme: 'ace/theme/merbivore_soft',
    }, editor => {
      // insert editor
      updateEditor({
        key: 'html',
        value: editor,
      });

      // init content
      editor.setValue(content);
      editNormalContent({
        key: 'html',
        value: editor.getValue(),
      });

      // listen change
      editor.on('change', function(e) {
        editNormalContent({
          key: 'html',
          value: editor.getValue(),
        });
        withTimer(() => {
          createIframe(
            store,
            document.getElementById('normal-result'),
          );
          localStorage['normal-html-editor'] = editor.getValue();
        });
      });

      // observe drag
      widthObserver(editor);
    });

    return {};
  },
}
</script>
