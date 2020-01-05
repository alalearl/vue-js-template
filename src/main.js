// declare what plugin to use in this project
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// declare other things
import App from './App';
import routes from '@/router';

// declare plugin to use in vueJs
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  el: '#app',
  render: h => h(App),
  routes,
});
