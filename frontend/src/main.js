import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import LocalStore from './plugin/localStore'
import './styles/global.scss'

const localStoreConfig = {
  store,
  moduleName: 'LS',
  userKey: 'jw-editor-store',
  stateKey: 'editorSetting',
  state: {
    fontSize: '15px',
    tabSize: 4,
    openEditor: true,
    openMenu: true,
  },
}

createApp(App)
  .use(store)
  .use(LocalStore, localStoreConfig)
  .use(router)
  .mount('#app');
