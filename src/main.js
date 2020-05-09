import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';
import VueQuill from 'vue-quill';
import VueMeta from 'vue-meta';
import moment from 'moment';
import VuePageTitle from 'vue-page-title';
import VueAnalytics from 'vue-analytics';


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookie);
Vue.use(VueQuill);
Vue.use(VueMeta);
Vue.use(VueAnalytics, {
  id: 'UA-158698915-1'
})
Vue.prototype.moment = moment;

Vue.use(VuePageTitle, {
  suffix: ' - The Husky Husky'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');