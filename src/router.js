import Vue from 'vue';
import Router from 'vue-router';
import MainView from './views/MainView.vue';
import About from './views/About.vue';
import TestView from './views/TestView.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/demo',
      name: 'demo',
      component: TestView,
    },
  ],
});
