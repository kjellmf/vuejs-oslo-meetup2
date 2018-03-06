import 'bulma/css/bulma.css';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import * as ms from 'milsymbol';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import MilSymbComp from './components/MilSymbol.vue';
import {formatDateString, formatPosition} from "./filters";

Vue.config.productionTip = false;
Vue.component('mil-symb', MilSymbComp);
Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

ms.setStandard('APP6');

Vue.filter('dateStr', formatDateString);
Vue.filter('position', formatPosition);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
