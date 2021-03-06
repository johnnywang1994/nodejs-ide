import { createStore } from 'vuex';

const state = {
  logs: [],
  jsEditContent: '',
  normalEditContent: {
    html: '',
    scss: '',
    js: '',
  },
  editors: {
    html: null,
    scss: null,
    js: null,
    jsSingle: null,
  },
  modal: '',
};

const UDPATE_EDITOR = 'UDPATE_EDITOR';

const UDPATE_LOGS = 'UDPATE_LOGS';

const UPDATE_JS_EDIT_CONTENT = 'UPDATE_JS_EDIT_CONTENT';

const UPDATE_NORMAL_EDIT_CONTENT = 'UPDATE_NORMAL_EDIT_CONTENT';

const UPDATE_MODAL = 'UPDATE_MODAL';

const actions = {
  pushLogs({ commit, state }, payload) {
    commit(UDPATE_LOGS, [
      ...state.logs,
      payload,
    ]);
  },
  updateEditor({ commit }, payload) {
    commit(UDPATE_EDITOR, payload);
  },
  clearLogs({ commit }) {
    commit(UDPATE_LOGS, []);
  },
  editJsContent({ commit }, newText) {
    commit(UPDATE_JS_EDIT_CONTENT, newText);
  },
  editNormalContent({ commit }, payload) {
    commit(UPDATE_NORMAL_EDIT_CONTENT, payload);
  },
  updateModal({ commit }, payload) {
    commit(UPDATE_MODAL, payload);
  }
};

const mutations = {
  [UDPATE_EDITOR](state, payload) {
    const { key, value } = payload;
    state.editors[key] = value;
  },
  [UDPATE_LOGS](state, payload) {
    state.logs = payload;
  },
  [UPDATE_JS_EDIT_CONTENT](state, payload) {
    state.jsEditContent = payload;
  },
  [UPDATE_NORMAL_EDIT_CONTENT](state, payload) {
    const { key, value } = payload;
    state.normalEditContent[key] = value;
  },
  [UPDATE_MODAL](state, payload) {
    state.modal = payload;
  },
};

export default createStore({
  state,
  actions,
  mutations,
});

export function useActions(store) {
  const access = (action) => (payload) => store.dispatch(action, payload);
  const pushLogs = access('pushLogs');
  const editJsContent = access('editJsContent');
  const editNormalContent = access('editNormalContent');
  const updateEditor = access('updateEditor');
  const updateModal = access('updateModal');
  const initLocalStorage = access('LS/initLocalStorage');
  const editLocalStorage = access('editLocalStorage');
  return {
    access,
    pushLogs,
    editJsContent,
    editNormalContent,
    updateEditor,
    updateModal,
    initLocalStorage,
    editLocalStorage,
  };
}
