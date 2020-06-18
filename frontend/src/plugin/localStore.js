// Global Settings
let enableEncoded = false;
let VuexKey = '$ls';
let WebKey = 'store';

// Mutation Key
const REFRESH_LOCALSTORE = 'REFRESH_LOCALSTORE';

const EDIT_LOCALSTORE = 'EDIT_LOCALSTORE';

// Actions
const actions = {
  initLocalStorage({ commit, dispatch, state }) {
    let oldStore = localStorage.getItem(WebKey);
    if (oldStore !== null) {
      try {
        oldStore = JSON.parse(oldStore);
      } catch {
        oldStore = JSON.parse(atob(oldStore));
      }
      commit(REFRESH_LOCALSTORE, {
        ...state[VuexKey],
        ...(
          oldStore.expire
            ? Date.now() < new Date(oldStore.expire) && oldStore
            : oldStore
        ),
      });
    }
    dispatch('refreshLocalStorage');
  },

  refreshLocalStorage({ state }) {
    const targetState = JSON.stringify(state[VuexKey]);
    localStorage.setItem(
      WebKey,
      enableEncoded ? btoa(targetState) : targetState,
    );
  },

  editLocalStorage: {
    root: true,
    handler({ commit, dispatch }, payload) {
      commit(EDIT_LOCALSTORE, payload);
      // update localStorage
      dispatch('refreshLocalStorage');
    },
  },
};

// Mutations
const mutations = {
  [REFRESH_LOCALSTORE](state, storage) {
    state[VuexKey] = storage;
  },
  [EDIT_LOCALSTORE](state, payload) {
    const { key, value } = payload;
    if (key && value !== '') {
      state[VuexKey][key] = value;
    } else {
      state[VuexKey] = payload;
    }
  },
};

function registerModule(store, options = {}) {
  const {
    moduleName = 'LS',
    stateKey,
    userKey,
    encode,
    state,
    getters
  } = options;
  stateKey && (VuexKey = stateKey);
  userKey && (WebKey = userKey);
  encode && (enableEncoded = encode);
  const ModuleOptions = {
    namespaced: true,
    state: {
      [VuexKey]: state || {}
    },
    getters: getters || {},
    actions,
    mutations,
  };

  // register as Vuex module
  store.registerModule(moduleName, ModuleOptions);
}

// Export
export default {
  install(app, options = {}) {
    const { store } = options;
    registerModule(store, options);
  },
};
