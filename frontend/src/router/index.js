import { createRouter, createWebHistory } from 'vue-router';
import NormalEditorView from '../views/NormalEditorView.vue';
import JsEditorView from '../views/JsEditorView.vue';

const routes = [
  {
    path: '/',
    name: 'NormalEditorView',
    component: NormalEditorView,
  },
  {
    path: '/js',
    name: 'JsEditorView',
    component: JsEditorView,
  }
];

export default createRouter({
  history: createWebHistory('./'),
  routes,
});
