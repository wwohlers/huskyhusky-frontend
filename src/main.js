import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';
import VueQuill from 'vue-quill';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueQuill);
Vue.prototype.moment = moment;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
