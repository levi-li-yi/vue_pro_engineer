import Vue from 'vue';
import Router from 'vue-router';
import g6 from './g6';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import(/* webpackChunkName: "layout" */ '../view/layout/Index.vue'),
      children: [
        ...g6
      ]
    },
  ]
})