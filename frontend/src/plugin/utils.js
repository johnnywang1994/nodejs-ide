import { onMounted } from 'vue';

export function createEditor(id, options, callback) {
  const { ace } = window;
  onMounted(() => {
    const editor = ace.edit(id, options);
    callback(editor);
  });
}

export function setTimer(ms) {
  let timer;
  return (fn) => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}

export function createIframe(store, iframe) {
  const sass = window.Sass;
  const { html, scss, js } = store.state.normalEditContent;
  sass.compile(scss, function(css) {
    const data = `
      <head>
        <style>${css.text && css.text.replace(/[\n|\s]/g, '')}</style>
      </head>
      <body>
        ${html}

        <script>
        ${js}
        </script>
      </body>
    `;
    iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(data);
  });
}

export function download(filename, text) {
  var el = document.createElement('a');
  el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  el.setAttribute('download', filename);

  el.style.display = 'none';
  document.body.appendChild(el);

  el.click();

  document.body.removeChild(el);
}

export function widthObserver(editor) {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'style') {
        let el = editor.container;
        if (el.offsetWidth !== 0) {
          el.parentNode.style.width = el.offsetWidth + 'px';
        }
      }
    });
  });
  observer.observe(editor.container, {
    attributes: true,
  });
}